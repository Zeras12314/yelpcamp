const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createReview,
  deleteReview,
} = require("../controllers/reviewController");

// CREATE REVIEW
router.post("/", createReview);

// DELETE REVIEW
router.delete("/:reviewId", deleteReview);

module.exports = router;
