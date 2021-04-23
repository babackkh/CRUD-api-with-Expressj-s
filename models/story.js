const mongoose = require('mongoose');

const Story = mongoose.Schema({
  location: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Story', Story);
