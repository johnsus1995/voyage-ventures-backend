import express from "express";
const router = express.Router();

import {
  createTour,
  deleteTour,
  getTour,
  getTours,
  getToursByUser,
  updateTour,
} from "../controllers/tour.js";
import verifyToken from "../middlewares/verifyToken.js";

router.get("/all-tours", getTours);
router.get("/:id", getTour);

router.post("/create", verifyToken, createTour);
router.get("/user/:id", verifyToken, getToursByUser);
router.delete("/:id", verifyToken, deleteTour);
router.put("/:id", verifyToken, updateTour);

export default router;
