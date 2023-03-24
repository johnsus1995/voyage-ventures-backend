import express from "express";
const router = express.Router();

import {
  createTour,
  getTour,
  getTours,
  getToursByUser,
} from "../controllers/tour.js";
import verifyToken from "../middlewares/verifyToken.js";

router.post("/create", verifyToken, createTour);
router.get("/all-tours", getTours);
router.get("/:id", getTour);
router.get("/user-tours/:id", verifyToken, getToursByUser);

export default router;
