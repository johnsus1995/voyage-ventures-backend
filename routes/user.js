import express from "express";
const router = express.Router();

import { signin, signUp } from "../controllers/user.js";

router.post("/signup", signUp);
router.post("/signin", signin);

export default router;
