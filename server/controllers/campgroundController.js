const campgroundData = require("../models/campground");
const mongoose = require("mongoose");

// GET ALL CAMPGROUNDS
const getAllCampgrounds = async (req, res) => {
  try {
    const campgrounds = await campgroundData.find({});
    res.status(200).json(campgrounds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET CAMPGROUND BY ID
const getCampground = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the ID format (optional, but recommended for added safety)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const campground = await campgroundData.findById(id);
    res.status(200).json(campground);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// CREATE NEW CAMPGROUND
const newCampground = async (req, res) => {
  try {
    const extistingCamp = await campgroundData.findOne({
      title: req.body.title,
    });
    if (extistingCamp) {
      return res.status(400).json({ message: "Campground already exists" });
    }
    const camp = await campgroundData.create(req.body);
    res.status(200).json(camp);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// UPDATE CAMPGROUND BY ID
const updateCampground = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the ID format (optional, but recommended for added safety)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const campGround = await campgroundData.findByIdAndUpdate(id, req.body);
    if (!campGround) {
      return res.status(404).json(`cannot find any Campground with ID ${id}`);
    }

    const updateCampGround = await campgroundData.findById(id);
    res.status(200).json(updateCampGround);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// DEELETE EXISTING CAMPGROUND
const deleteCampGounrd = async(req, res) => {
  try {
    const { id } = req.params;
     // Validate the ID format (optional, but recommended for added safety)
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const campGround = await campgroundData.findByIdAndDelete(id);
    if (!campGround) {
      return res.status(404).json(`cannot find any camp ground with ID ${id}`)
    }
    res.status(200).json(campGround);
  } catch (error) {
    res.status(500);
    throw new Error(error.message) 
  }
}

module.exports = {
  getAllCampgrounds,
  getCampground,
  newCampground,
  updateCampground,
  deleteCampGounrd
};
