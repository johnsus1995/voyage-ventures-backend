import mongoose from "mongoose";
import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;

  const newTour = new Tour({
    ...tour,
    created_at: new Date().toISOString(),
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
    res.send(404).json({
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
    res.send(404).json({
      success: true,
      data: "tours",
      message: "Something went wrong with fetching the tour",
    });
  }
};

export const getToursByUser = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.send(404).json({
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
    res.send(404).json({
      success: true,
      data: "",
      message: "Something went wrong with fetching the tour",
    });
  }
};