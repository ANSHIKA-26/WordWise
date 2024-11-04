import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  overallExperience: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  featuresUsed: {
    type: [String],
    enum: ['vocabulary', 'grammar', 'pronunciation', 'reading', 'listening'],
    required: true
  },
  mostHelpfulFeature: {
    type: String,
    enum: ['vocabulary', 'grammar', 'pronunciation', 'reading', 'listening'],
    required: true
  },
  improvement: {
    type: String,
    trim: true
  },
  newFeatures: {
    type: String,
    trim: true
  },
  recommendation: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  additionalComments: {
    type: String,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
