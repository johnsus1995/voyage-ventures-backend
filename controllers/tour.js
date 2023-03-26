import mongoose from "mongoose";
// import compressImage from "../helpers/compressImage.js";
import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;

  const newTour = new Tour({
    // image:compressImage(tour.image),
    created_at: new Date().toISOString(),
    ...tour,
  });

  try {
    await newTour.save();
    res.status(201).json({
      success: true,
      data: newTour,
      message: "New tour created successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "",
      message: "Something went wrong with tour creation.",
    });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      success: true,
      data: tours,
      message: "All tours fetched successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      data: "tours",
      message: "Something went wrong with fetching tours",
    });
  }
};

export const getTour = async (req, res) => {
  const tour_id = req.params.id
  try {
    const tour = await Tour.findById(tour_id);
    res.status(200).json({
      success: true,
      data: tour,
      message: "Tour fetched successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      data: "tours",
      message: "Something went wrong with fetching requested tour",
    });
  }
};

export const getToursByUser = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({
      success: false,
      data: "",
      message: "User does not exist!",
    });
  }
  
  try {
    const tour = await Tour.find({created_by:id});
    res.status(200).json({
      success: true,
      data: tour,
      message: "Tours fetched successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: true,
      data: "",
      message: "Something went wrong with fetching tours",
    });
  }
};

export const deleteTour = async (req, res) => {
  const {id} = req.params

  try {
    const tour = await Tour.findByIdAndRemove(id);
    res.status(200).json({
      success: true,
      data: tour,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "tours",
      message: "Something went wrong with deleting tour",
    });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, desc, created_by, image, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        data: "tours",
        message: "Not valid id",
      });
    }

    const updatedTour = {
      created_by,
      title,
      desc,
      tags,
      image,
      _id: id,
    };

    await Tour.findByIdAndUpdate(id, updatedTour, { new: true });
    res.status(200).json({
      success: true,
      data: updatedTour,
      message: "Tour updated successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "",
      message: "Something went wrong with updating tour",
    });
  }
};

export const searchTours = async (req, res) => {
  const { search_query } = req.query;

  try {
    const title = new RegExp(search_query, "i");
    const tours = await Tour.find({ title });
    res.status(200).json({
      success: true,
      data: tours,
      message: "Tour fetched successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "",
      message: "Searching tours was failed",
    });
  }
};