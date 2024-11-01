import express from "express";
import { getFeed, submitFeedback } from "../controllers/feedController.js";
const router = express.Router();


router.post("/saveFeedback", submitFeedback);
router.get("/saveFeedback", getFeed);

export default router;
