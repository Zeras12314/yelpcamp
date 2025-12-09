const express = require("express");
const router = express.Router({ mergeParams: true });
const { createReview } = require("../controllers/reviewController");

router.post("/", createReview);

module.exports = router;
