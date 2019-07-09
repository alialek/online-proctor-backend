const mongoose = require('mongoose');

const SpiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = Spice = mongoose.model('Spice', SpiceSchema);
