import express from "express";
import { submitGetInTouch } from "../controllers/getInTouchController.js";
const router = express.Router();


router.post("/saveGetInTouch", submitGetInTouch);

export default router;
