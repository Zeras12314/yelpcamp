const express = require("express");
const router = express.Router();
const {
  getAllCampgrounds,
  getCampground,
  newCampground,
  updateCampground,
  deleteCampGround,
} = require("../controllers/campgroundController");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const { asyncHandler } = require("../utils/asyncHandler");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(asyncHandler(getAllCampgrounds))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    asyncHandler(newCampground)
  );

router
  .route("/:id")
  .get(asyncHandler(getCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    asyncHandler(updateCampground)
  )
  .delete(isLoggedIn, isAuthor, asyncHandler(deleteCampGround));

module.exports = router;
