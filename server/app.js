if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ quiet: true });
}

const express = require("express");
const cors = require("cors");
const campGroundRoute = require("./routes/campgroundRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const userRoute = require("./routes/userRoutes");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

// MONGO SESSION
// const { MongoStore } = require("connect-mongo");
// const MongoDBStore = require("connect-mongo")(session);
const MongoStore = require("connect-mongo")(session);

const API_PATHS = {
  CAMP: "/api/campgrounds",
  REVIEW: "/api/campgrounds/:id/reviews",
};

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = isProduction
        ? ["https://yelpcamp-5u6m.onrender.com"]
        : ["http://localhost:4200"];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("tiny")); //automatically logs details about incoming requests and responses
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.rbvedxm.mongodb.net/YelpCamp?retryWrites=true&w=majority&appName=Cluster0`;
const connect = mongoose.connect(mongoUrl);

const store = new MongoStore({
  url: mongoUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

app.set("trust proxy", 1);
// EXPRESS-SESSION
const sessionConfig = {
  store,
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true, // IMPORTANT
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week in ms
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
    secure: isProduction, // true in production with HTTPS
    sameSite: isProduction ? "none" : "lax", // allow cross-site cookies
  },
};

app.use(session(sessionConfig));

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
// passport - forU User, Session etc.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// EXPRESS-SESSION END

// API Routes
app.use(API_PATHS.CAMP, campGroundRoute);
app.use(API_PATHS.REVIEW, reviewRoute);
// app.use(`${API_PATHS.CAMP}/user`, userRoute);
app.use("/api/campgrounds/user", userRoute);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

connect
  .then(() => {
    console.log("MongoDB Successfully Connected");
    app.listen(port, () => {
      if (process.env.NODE_ENV === "production") {
        console.log("🚀 Server is running in production.");
      } else {
        console.log(`🛠️ Environment: Development | Port: ${port}`);
      }
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(500).json({
    status: "error",
    message: err.message,
  });
});
