const campgroundData = require("./models/campground");
const reviewData = require("./models/review");
const Joi = require("joi");

const isLoggedIn = (req, res, next) => {
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

const validateCampground = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string(),
    price: Joi.number().min(1),
    description: Joi.string().min(10),
    location: Joi.string().min(5),

    // ✅ allow deleteImages from FormData
    deleteImages: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string()
    ),
  }).unknown(true); // 👈 IMPORTANT for multipart/form-data

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((d) => d.message).join(", "),
    });
  }

  next();
};

const validateImages = (req, res, next) => {
  // ✅ Image validation first
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ status: "error", message: '"image" is required' });
  }

  next();
};

module.exports = {
  isLoggedIn,
  isAuthor,
  validateReview,
  isReviewAuthor,
  validateCampground,
  validateImages,
};
