const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
  },
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  answer: {
    type: String
  },
  question: {
    type: String
  },
  mark: {
    type: Number,
    default: 0
  }
});


const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  until: {
    type: String
  },
  deadline: {
    type: String
  },
  answers: {
    type: Array
  },
});


const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  description: {
    type: String,
    required: true,
  },
  timeToAnswer: {
    type: Number,
  },
  createdBy: {
    type: String,
  },
  questions: {
    type: Array,
  }, 
  participants: [{
    userId: '',
    userName: '',
    answers: [AnswerSchema]
  }]
});

module.exports = {
  Test: mongoose.model("Test", TestSchema),
  Question: mongoose.model("Question", QuestionSchema),
  Answer: mongoose.model("Answer", AnswerSchema),
};
