const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  workingHours: {
    type: String,
    required: true
  },
  coordinates: [
    {
      latitude: {
        type: String
      },
      longitude: {
        type: String
      }
    }
  ],
  image: [String]
});

module.exports = Location = mongoose.model('Location', LocationSchema);
