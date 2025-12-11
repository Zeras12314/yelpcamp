const reviewData = require("../models/review");
const mongoose = require("mongoose");
const { asyncHandler } = require("../utils/asyncHandler");
const CampGroundData = require("../models/campground");
const Joi = require("joi");

const validateReview = (data) => {
  const schema = Joi.object({
    body: Joi.string().required().min(5),
    rating: Joi.number().required().min(1),
  });

  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message);
    const err = new Error(messages.join(", "));
    err.statusCode = 400;
    throw err;
  }
  return value;
};

//POST review
const createReview = asyncHandler(async (req, res) => {
  const validatedData = validateReview(req.body);
  const campground = await CampGroundData.findById(req.params.id);
  const review = await reviewData.create(validatedData);
  campground.reviews.push(review._id);
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
