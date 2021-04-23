const PortfolioImage = require('../models/portfolio');

exports.createPortfolioImage = (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const portfolioImage = new PortfolioImage({
    location: req.body.location,
    caption: req.body.caption,
    category: req.body.category,
    imagePath: `${url}/images/portfolio/${req.file.filename}`,
  });
  portfolioImage
    .save()
    .then((savedPortfolio) => {
      res.status(200).json({
        message: 'CREATED_SUCCESSFULLY',
        portfolioImage: savedPortfolio,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'CREATION_FAILED', reason: error });
    });
};

exports.getPortfolioImages = (req, res, next) => {
  PortfolioImage.find()
    .then((fetchedDocuments) => {
      res.status(200).json({
        message: 'FETCHED_SUCCESSFULLY',
        portfolioImages: fetchedDocuments,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'FETCHING_FAILED', reason: error });
    });
};

exports.getPortfolioImage = (req, res, next) => {
  PortfolioImage.findOne({ _id: req.params.id })
    .then((fetchedDocument) => {
      res.status(200).json({
        message: 'FETCHED_SUCCESSFULLY',
        portfolioImage: fetchedDocument,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'IMAGE_NOT_FOUND', reason: error });
    });
};

exports.updatePortfolioImage = (req, res, next) => {
  const updatedPortfolioImage = new PortfolioImage({
    _id: req.body.id,
    caption: req.body.caption,
    location: req.body.location,
    category: req.body.category,
  });
  PortfolioImage.updateOne({ _id: req.params.id }, updatedPortfolioImage)
    .then((updateResult) => {
      res.status(200).json({ message: 'UPDATE_SUCCESSFUL' });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.deletePortfolioImage = (req, res, next) => {
  PortfolioImage.deleteOne({ _id: req.params.id })
    .then((deletionResult) => {
      res.status(200).json({
        message: 'DELETED_SUCCESSFULLY',
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'DELETION_FAILED', reason: error });
    });
};
