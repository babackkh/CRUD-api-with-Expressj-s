const mongoose = require('mongoose');

const StoryImage = mongoose.Schema({
  caption: { type: String, required: false },
  imagePath: { type: String, required: true },
  story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
});

module.exports = mongoose.model('StoryImage', StoryImage);
