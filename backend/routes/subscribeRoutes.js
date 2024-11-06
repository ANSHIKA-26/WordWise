import express from "express";
const router = express.Router();
import { getSubscribe, saveSubsribe } from "../controllers/subscribeController.js";

router.post("/subscribe", saveSubsribe);
router.get("/getSubscribe", getSubscribe);

export default router;
