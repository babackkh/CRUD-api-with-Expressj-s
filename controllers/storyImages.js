const StoryImage = require('../models/story-image');
const storyImage = require('../models/story-image');

exports.createStoryImage = (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const storyImage = new StoryImage({
    caption: req.body.caption,
    imagePath: `${url}/images/stories/${req.file.filename}`,
    story: req.body.storyId,
  });
  storyImage
    .save()
    .then((savedStoryImage) => {
      res.status(200).json({
        message: 'CREATED_SUCCESSFULLY',
        storyImage: savedStoryImage,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'CREATION_FAILED', reason: error });
    });
};

exports.getStoryImages = (req, res, next) => {
  StoryImage.find({ story: req.params.id })
    .then((fetchedDocuments) => {
      res.status(200).json({
        message: 'FETCHED_SUCCESSFULLY',
        storyImages: fetchedDocuments,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'FETCHING_FAILED', reason: error });
    });
};

exports.getStoryImage = (req, res, next) => {
  StoryImage.findOne({ _id: req.params.id })
    .then((fetchedDocument) => {
      res.status(200).json({
        message: 'FETCHED_SUCCESSFULLY',
        storyImage: fetchedDocument,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'IMAGE_NOT_FOUND', reason: error });
    });
};

exports.updateStoryImage = (req, res, next) => {
  let imagePath = req.body.image;
  if (req.file) {
    const url = `${req.protocol}://${req.get('host')}`;
    imagePath = `${url}/images/stories/${req.file.filename}`;
  }
  const updatedStoryImage = new StoryImage({
    _id: req.body.id,
    caption: req.body.caption,
    imagePath: imagePath,
    story: req.body.storyId,
  });
  storyImage
    .updateOne({ _id: req.params.id }, updatedStoryImage)
    .then((updateResult) => {
      console.log(updateResult);
      res
        .status(200)
        .json({ message: 'UPDATE_SUCCESSFUL', storyImage: updatedStoryImage });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.deleteStoryImage = (req, res, next) => {
  StoryImage.deleteOne({ _id: req.params.id })
    .then((deletionResult) => {
      res.status(200).json({
        message: 'DELETED_SUCCESSFULLY',
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'DELETION_FAILED', reason: error });
    });
};
