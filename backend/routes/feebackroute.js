import express from "express";
const router = express.Router();
import { saveFeedback } from "../controllers/feedbackcontroller.js";

router.post("/savefeedback", saveFeedback);

export default router;
