const express = require("express");
const router = express.Router();
const {
  getAllCampgrounds,
  getCampground,
  newCampground,
  updateCampground,
  deleteCampGround,
} = require("../controllers/campgroundController");
const { isLoggedIn, isAuthor } = require("../middleware");
const { asyncHandler } = require("../utils/asyncHandler");

router
  .route("/")
  .get(asyncHandler(getAllCampgrounds))
  .post(isLoggedIn, asyncHandler(newCampground));

router
  .route("/:id")
  .get(asyncHandler(getCampground))
  .put(isLoggedIn, isAuthor, asyncHandler(updateCampground))
  .delete(isLoggedIn, isAuthor, asyncHandler(deleteCampGround));

module.exports = router;
