const mongoose = require('mongoose');

const PortfolioImage = mongoose.Schema({
  location: { type: String, required: true },
  caption: { type: String, required: true },
  category: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('PortfolioImage', PortfolioImage);
