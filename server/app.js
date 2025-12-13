const express = require("express");
const cors = require("cors");
const campGroundRoute = require("./routes/campgroundRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const API_PATHS = {
  CAMP: "/api/campgrounds",
  REVIEW: "/api/campgrounds/:id/reviews",
};

const port = 3000;
app.use(express.json()); // Middleware to parse JSON bodies
app.use(
  cors({
    origin: "http://localhost:4200", // Angular dev server
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent cross-origin
  })
);
app.use(morgan("tiny")); //automatically logs details about incoming requests and responses
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

// EXPRESS-SESSION
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week in ms
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // correct Date object
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax",
  },
};
app.use(session(sessionConfig));
// EXPRESS-SESSION END

// API Routes
app.use(API_PATHS.CAMP, campGroundRoute);
app.use(API_PATHS.REVIEW, reviewRoute);

const connect = mongoose.connect(
  "mongodb+srv://chickentaba01:EuTu2XiQsURoSsk9@cluster0.rbvedxm.mongodb.net/YelpCamp?retryWrites=true&w=majority&appName=Cluster0"
);

connect
  .then(() => {
    console.log("MongoDB Successfully Connected");
    app.listen(port, () => {
      console.log(`Server running on Port: ${port}`);
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
