const campgroundData = require("../models/campground");
const mongoose = require("mongoose");
const { asyncHandler } = require("../utils/asyncHandler");
const Joi = require("joi");

const validateCampground = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required().min(1),
    description: Joi.string().required().min(10),
    location: Joi.string().required().min(5),
  });

  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message);
    const err = new Error(messages.join(", "));
    err.statusCode = 400;
    throw err;
  }
  return value;
};

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
  const campground = await campgroundData.findById(id).populate("reviews");
  res.status(200).json(campground);
});

// CREATE NEW CAMPGROUND
const newCampground = asyncHandler(async (req, res) => {
  const validatedData = validateCampground(req.body);
  const existingCamp = await campgroundData.findOne({
    title: validatedData.title,
  });
  if (existingCamp) {
    return res.status(400).json({ message: "Campground already exists" });
  }
  const camp = await campgroundData.create(req.body);
  res.status(200).json(camp);
});

// UPDATE CAMPGROUND BY ID
const updateCampground = asyncHandler(async (req, res) => {
  const validatedData = validateCampground(req.body);
  const { id } = req.params;
  // Validate the ID format (optional, but recommended for added safety)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const campGround = await campgroundData.findByIdAndUpdate(id, validatedData, {
    new: true,
  });

  if (!campGround) {
    return res
      .status(404)
      .json({ message: `Cannot find any campground with ID ${id}` });
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
  res.status(200).json(`Successfully deleted ${campGround.title}`);
});

module.exports = {
  getAllCampgrounds,
  getCampground,
  newCampground,
  updateCampground,
  deleteCampGounrd,
};
