const mongoose = require("mongoose");

const CampgroundSchema = mongoose.Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

const CampGroundData = mongoose.model("campgrounds", CampgroundSchema);
module.exports = CampGroundData;
