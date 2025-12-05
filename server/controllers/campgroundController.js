const campgroundData = require("../models/campground");
const mongoose = require("mongoose");
const { asyncHandler } = require("../utils/asyncHandler");

// GET ALL CAMPGROUNDS
const getAllCampgrounds = asyncHandler(async (req, res) => {
  const campgrounds = await campgroundData.find({});
  res.status(200).json(campgrounds);
});
// GET CAMPGROUND BY ID
const getCampground = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Validate the ID format (optional, but recommended for added safety)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const campground = await campgroundData.findById(id);
  res.status(200).json(campground);
});

// CREATE NEW CAMPGROUND
const newCampground = asyncHandler(async (req, res) => {
  const extistingCamp = await campgroundData.findOne({
    title: req.body.title,
  });
  if (extistingCamp) {
    return res.status(400).json({ message: "Campground already exists" });
  }
  const camp = await campgroundData.create(req.body);
  res.status(200).json(camp);
});

// UPDATE CAMPGROUND BY ID
const updateCampground = asyncHandler(async (req, res) => {
  const { id, price } = req.params;
  // Validate the ID format (optional, but recommended for added safety)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res
      .status(400)
      .json({ message: "Price should be greater than zero" });
  }
  const campGround = await campgroundData.findByIdAndUpdate(id, req.body);
  if (!campGround) {
    return res.status(404).json(`cannot find any Campground with ID ${id}`);
  }

  const updateCampGround = await campgroundData.findById(id);
  res.status(200).json(updateCampGround);
});

// DEELETE EXISTING CAMPGROUND
const deleteCampGounrd = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Validate the ID format (optional, but recommended for added safety)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const campGround = await campgroundData.findByIdAndDelete(id);
  if (!campGround) {
    return res.status(404).json(`cannot find any camp ground with ID ${id}`);
  }
  res.status(200).json(campGround);
});

module.exports = {
  getAllCampgrounds,
  getCampground,
  newCampground,
  updateCampground,
  deleteCampGounrd,
};
