const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String
  },
  type: {
    type: String,
    enum: [
      'single',
      'multiple',
      'openAnswerWithCorrect',
      'openAnswer',
    ]
  },
  descrpition: {
    type: String
  },
  answer: {
    type: String
  },
  photoUrl: {
    type: String 
  },
  videoUrl: {
    type: String 
  },
  timeToSolve: {
    type: Number 
  },
});

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tries: {
    type: Number
  },
  amount: {
    type: Number
  },
  results: [],
  questions: {
    type: Array
  },
  
});


module.exports = {
  Test: mongoose.model('Test', TestSchema),
  Question: mongoose.model('Question', QuestionSchema),
}
