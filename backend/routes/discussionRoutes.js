import express from 'express';
const router = express.Router();

import { getQuestions, saveQuestion, addAnswerToQuestion } from '../controllers/discussionController.js';

router.get('/getQuestion', getQuestions);

router.post('/postQuestion', saveQuestion);

router.put('/:id/answer', addAnswerToQuestion);

export default router;
