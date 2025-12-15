const express = require("express");
const router = express.Router();
const {
  getAllCampgrounds,
  getCampground,
  newCampground,
  updateCampground,
  deleteCampGround,
} = require("../controllers/campgroundController");
const { isLoggedIn } = require("../middleware");

// GET ALL CAMPGROUNDs
router.get("/", getAllCampgrounds);

// GET CAMPGROUND BY ID
router.get("/:id", getCampground);

// CREATE CAMPGROUND
router.post("/", isLoggedIn, newCampground);

//UPDATE CAMPGROUND
router.put("/:id", isLoggedIn, updateCampground);

//DELETE EXISTING ROOM
router.delete("/:id", isLoggedIn, deleteCampGround);

module.exports = router;
