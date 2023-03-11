import express from "express";
const router = express.Router();

import { createTour, getTours } from "../controllers/tour.js";

router.post("/create", createTour);
router.get("/all-tours", getTours);

export default router;