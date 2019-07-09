const mongoose = require('mongoose');

const SyrupSchema = new mongoose.Schema({
  title: {
    type: String
  },
  emoji: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = Syrup = mongoose.model('Syrup', SyrupSchema);
