// routes/feedbackRoutes.js

import express from 'express';
import  saveRating  from '../controllers/ratingController.js';

const router = express.Router();

// Route to save feedback
router.post('/', saveRating);

export default router
