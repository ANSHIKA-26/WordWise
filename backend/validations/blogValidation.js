import { body, validationResult } from 'express-validator';

export const blogValidation = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('topic').not().isEmpty().withMessage('Topic is required'),
  body('image').not().isEmpty().withMessage('Image is required'),
  body('content').not().isEmpty().withMessage('Content is required'),
  body('author').not().isEmpty().withMessage('Author is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
