import QuestionModel from "../models/question.js";
import Answer from "../models/answers.js";
export const createQuestion = async (req, res) => {
    try {
      const { content } = req.body;
  
      // Check if the question already exists
      const existingQuestion = await QuestionModel.findOne({ content });
      if (existingQuestion) {
        return res.status(400).json({ message: "Question already exists" });
      }
  
      // Create the new question
      const newQuestion = new QuestionModel({ content });
      await newQuestion.save();
  
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Route to fetch questions based on 'answered' or 'unanswered' query
export const getQuestions = async (req, res) => {
  try {
    const  question = req.query.question;
    
    let query;
    if (question === "answered") {
      // Fetch questions with at least one answer, and include the answers
      query = QuestionModel.find({ answered: true }).populate("answers");

    } else if (question === "unanswered") {
      // Fetch questions with no answers
      query = QuestionModel.find({ answered: false }).populate("answers");
    } else {
      // If no specific filter is provided, fetch all questions
      query = QuestionModel.find();
    }

    const questions = await query.exec();
    if(!question){
        res.status(200).json({message:"No response"})
    }
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Example route to create a new question with an optional answer

export const answerQuestion = async (req, res) => {
    try {
      const { questionId } = req.body;  // The ID of the question to answer
      const { content } = req.body;
    
      // Check if the question exists
      const existingQuestion = await QuestionModel.findById(questionId);
      if (!existingQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      // Create a new answer linked to the question
      const newAnswer = new Answer({
        content,
        question: questionId,
      });
      await newAnswer.save();
  
      // Add the answer ID to the question's answers array
      existingQuestion.answers.push(newAnswer._id);
      existingQuestion.answered=true;
      await existingQuestion.save();
  
      res.status(201).json({ message: "Answer added successfully", answer: newAnswer });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };