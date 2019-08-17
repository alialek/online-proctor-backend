const mongoose = require('mongoose');

const userRiddleSchema = new mongoose.Schema({
  id: {
    type: String
  },
  timeStart: {
    type: Date,
    default: Date.now
  },
  timeFinish: {
    type: Date
  },
  lastAnswer: {
    type: String
  },
  isSolved: {
    type: Boolean
  }
});

const userQuestSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  riddles: [userRiddleSchema],
  amount: {
    type: Number
  },
  solvedRiddles: {
    type: Number
  }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  quests: [userQuestSchema]
});

const userQuest = mongoose.model('userQuest', userQuestSchema);
const userRiddle = mongoose.model('userRiddle', userRiddleSchema);

module.exports = User = mongoose.model('user', UserSchema);
