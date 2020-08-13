const mongoose = require('mongoose');



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
  group: {
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
});



module.exports = {User: mongoose.model('user', UserSchema),
Test: mongoose.model('test', userTestSchema)}
