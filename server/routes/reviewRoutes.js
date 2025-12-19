const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createReview,
  deleteReview,
} = require("../controllers/reviewController");
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const { asyncHandler } = require("../utils/asyncHandler");


// CREATE REVIEW
router.post("/", isLoggedIn, asyncHandler(createReview));

// DELETE REVIEW
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, asyncHandler(deleteReview));

module.exports = router;
