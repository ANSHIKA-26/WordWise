import mongoose from "mongoose";
import QuestionModel from './question.js';

const answerSchema = new mongoose.Schema({
    content:{
        type:String
    },

});

const answer = mongoose.model("Answer", answerSchema);
export default answer;