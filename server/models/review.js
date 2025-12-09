const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  body: String,
  rating: Number,
});

const reviewData = mongoose.model("Review", reviewSchema);
module.exports = reviewData;
