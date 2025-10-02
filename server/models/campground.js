const mongoose = require("mongoose");

const CampgroundSchema = mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

const CampGroundData = mongoose.model("campgrounds", CampgroundSchema);
module.exports = CampGroundData;
