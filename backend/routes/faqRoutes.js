import express from "express";
const router = express.Router();
// import { getContact, saveContact } from "../controllers/contactController.js";
import {createQuestion, getQuestions,answerQuestion} from "../controllers/faqController.js"

router.post("/createquestion", createQuestion);
router.get("/getquestions",getQuestions);
router.post("/answerquestion",answerQuestion);

export default router;