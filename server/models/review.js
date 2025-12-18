const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  body: String,
  rating: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const reviewData = mongoose.model("Review", reviewSchema);
module.exports = reviewData;
