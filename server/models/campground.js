const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

// Important: include virtuals in JSON
ImageSchema.set("toJSON", { virtuals: true });

const CampgroundSchema = mongoose.Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});


const CampGroundData = mongoose.model("campgrounds", CampgroundSchema);
module.exports = CampGroundData;
