const mongoose = require('mongoose');

const Bio = mongoose.Schema({
  text: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Bio', Bio);
