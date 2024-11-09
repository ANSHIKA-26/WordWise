import express from "express";
const router = express.Router();
import {
  getContact,
  saveContact,
  newsletter,
} from "../controllers/contactController.js";

router.post("/saveContact", saveContact);
router.get("/saveContact", getContact);
router.post("/newsletter", newsletter);
export default router;
