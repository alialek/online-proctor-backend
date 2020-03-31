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

const userTestSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  tests: {
    type: Array,
    default: []
  },
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
  tabId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  tests: [],
  quests: [userQuestSchema]
});

// const userQuest = mongoose.model('userQuest', userQuestSchema);
// const userRiddle = mongoose.model('userRiddle', userRiddleSchema);
// const userTest = mongoose.model('userTest', userTestSchema);

module.exports = {User: mongoose.model('user', UserSchema),
Riddle: mongoose.model('riddle', userRiddleSchema),
Test: mongoose.model('test', userTestSchema)}
