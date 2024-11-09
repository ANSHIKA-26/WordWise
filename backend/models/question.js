import mongoose, { Mongoose } from "mongoose";
import answer from "./answers.js"
// import answer from "./answers.js";
const questionSchema = new mongoose.Schema({
    content:{
        type:String
    },
    answers:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:answer
        }
    ],
    answered:{
        type:Boolean,
        default: false
    },

});
export default mongoose.models.Question || mongoose.model('Question', questionSchema);

