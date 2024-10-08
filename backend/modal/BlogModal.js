const mongoose = require("mongoose");

//schema to insert data in mongodb databse

const BlogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  content: {
    type: String,
    required: true,
  },
  writerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BlogModal", BlogSchema);
