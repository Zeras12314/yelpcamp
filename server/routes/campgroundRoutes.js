const express = require("express");
const router = express.Router();
const {
  getAllCampgrounds,
  getCampground,
  newCampground,
  updateCampground,
  deleteCampGounrd
} = require("../controllers/campgroundController");

// GET ALL CAMPGROUNDs
router.get("/", getAllCampgrounds);

// GET CAMPGROUND BY ID
router.get("/:id", getCampground);

// CREATE CAMPGROUND
router.post("/", newCampground);

//UPDATE CAMPGROUND
router.put("/:id", updateCampground);

//DELETE EXISTING ROOM
router.delete('/:id', deleteCampGounrd)

module.exports = router;
