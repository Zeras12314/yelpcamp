const campgroundData = require("./models/campground");
const reviewData = require("./models/review")
const Joi = require("joi");

const isLoggedIn = (req, res, next) => {
  console.log("REQ.USER...", req.user);
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ status: "error", message: "You must be logged in" });
  }
  next();
};

const isAuthor = async (req, res, next) => {
  const { id } = req.params;

  const campground = await campgroundData.findById(id);
  if (!req.user.id || !campground.author.equals(req.user.id)) {
    return res.status(403).json({ message: "No permission to update data" });
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await reviewData.findById(reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  // Check if logged-in user is the author
  if (!req.user._id.equals(review.author)) {
    return res
      .status(403)
      .json({ message: "No permission to delete this review" });
  }

  next();
};

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

module.exports = { isLoggedIn, isAuthor, validateReview, isReviewAuthor };
