const reviewData = require("../models/review");
const mongoose = require("mongoose");
const { asyncHandler } = require("../utils/asyncHandler");
const CampGroundData = require("../models/campground");
const { validateReview } = require("../middleware");

//POST review
const createReview = asyncHandler(async (req, res) => {
  const validatedData = validateReview(req.body);
  const campground = await CampGroundData.findById(req.params.id);
  const review = await reviewData.create({
    ...validatedData,
    author: req.user._id,
  });
  campground.reviews.push(review._id);
  await review.populate("author");
  await campground.save();
  res.status(200).json(review);
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review id" });
  }

  // check if review exists
  const existingReview = await reviewData.findById(reviewId);

  if (!existingReview) {
    return res.status(400).json({ message: "Review not found" });
  }

  await CampGroundData.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await reviewData.findByIdAndDelete(reviewId);
  res.status(200).json("Successfully Deleted");
});

module.exports = {
  createReview,
  deleteReview,
};
