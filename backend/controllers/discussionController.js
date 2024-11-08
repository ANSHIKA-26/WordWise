import Question from '../models/discussion.js';

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve questions' });
    }
};

// Save a new question to MongoDB
export const saveQuestion = async (req, res) => {
    try {
        const { content } = req.body;

        const newQuestion = new Question({
            content,
        });

        await newQuestion.save();

        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save question' });
    }
};

export const addAnswerToQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const { answer } = req.body;


        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { answered: true, answer },
            { new: true }
        );

        if (updatedQuestion) {
            res.json(updatedQuestion);
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update question' });
    }
};
