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
