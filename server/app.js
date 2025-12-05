const express = require("express");
const cors = require("cors");
const path = require("path");
const campGroundRoute = require("./routes/campgroundRoutes");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: false }));

app.use("/api/campgrounds", campGroundRoute);

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

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(500).json({
    status: "error",
    message: err.message,
  });
});
