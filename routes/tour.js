import express from "express";
const router = express.Router();

import { createTour, getTours } from "../controllers/tour.js";
import verifyToken from "../middlewares/verifyToken.js";

router.post("/create", verifyToken,createTour);
router.get("/all-tours", getTours);

export default router;