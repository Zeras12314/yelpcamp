const campgroundData = require("../models/campground");
const mongoose = require("mongoose");

// GET ALL CAMPGROUNDS
const getAllCampgrounds = async (req, res) => {
  const campgrounds = await campgroundData.find({});
  res.status(200).json(campgrounds);
};
// GET CAMPGROUND BY ID
const getCampground = async (req, res) => {
  const { id } = req.params;
  // Validate the ID format (optional, but recommended for added safety)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const campground = await campgroundData
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.status(200).json(campground);
};

// CREATE NEW CAMPGROUND
const newCampground = async (req, res) => {
  // ✅ Image validation first
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ status: "error", message: '"image" is required' });
  }

  // ✅ Check duplicate
  const existingCamp = await campgroundData.findOne({
    title: req.body.title,
  });

  if (existingCamp) {
    return res.status(400).json({ message: "Campground already exists" });
  }

  // ✅ Create campground
  const camp = await campgroundData.create({
    ...req.body,
    author: req.user._id,
    images: req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    })),
  });
  console.log(camp);
  res.status(201).json(camp);
};

// UPDATE CAMPGROUND BY ID
const updateCampground = async (req, res) => {
  const { id } = req.params;

  // ✅ Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  // ✅ Fetch existing campground
  const existingCamp = await campgroundData.findById(id);
  if (!existingCamp) {
    return res
      .status(404)
      .json({ message: `Cannot find any campground with ID ${id}` });
  }

  // ✅ Handle new uploaded files
  let images = existingCamp.images || []; // start with existing images
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    images = images.concat(newImages); // merge existing + new
  }

  // ✅ Update campground data
  const updatedData = {
    ...req.body,
    images, // merged images
  };

  const updatedCamp = await campgroundData.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  res.status(200).json(updatedCamp);
};

// DEELETE EXISTING CAMPGROUND
const deleteCampGround = async (req, res) => {
  const { id } = req.params;
  // Validate the ID format (optional, but recommended for added safety)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid camp ID" });
  }
  const campGround = await campgroundData.findByIdAndDelete(id);
  if (!campGround) {
    return res.status(404).json(`cannot find any camp ground with ID ${id}`);
  }
  res.status(200).json(`Successfully deleted ${campGround.title}`);
};

module.exports = {
  getAllCampgrounds,
  getCampground,
  newCampground,
  updateCampground,
  deleteCampGround,
};
