const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createReview,
  deleteReview,
} = require("../controllers/reviewController");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

// CREATE REVIEW
router.post("/", isLoggedIn, createReview);

// DELETE REVIEW
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, deleteReview);

module.exports = router;
