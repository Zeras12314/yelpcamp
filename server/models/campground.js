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
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = mongoose.Schema(
  {
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
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
  },
  opts
);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `
    <h5><strong><a href="/campground-details/${
      this._id
    }">${this.title}</a></strong></h5>
    <p style="color: #212529; ">${this.description.substring(0, 60)}...</p>`;
});

const CampGroundData = mongoose.model("campgrounds", CampgroundSchema);
module.exports = CampGroundData;
