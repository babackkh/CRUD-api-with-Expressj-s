const Story = require('../models/story');

exports.createStory = (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const story = new Story({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    imagePath: `${url}/images/stories/${req.file.filename}`,
  });
  story
    .save()
    .then((savedStory) => {
      res.status(200).json({
        message: 'CREATED_SUCCESSFULLY',
        story: savedStory,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'CREATION_FAILED', reason: error });
    });
};

exports.getStories = (req, res, next) => {
  Story.find()
    .then((fetchedDocuments) => {
      res.status(200).json({
        message: 'FETCHED_SUCCESSFULLY',
        stories: fetchedDocuments,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'FETCHING_FAILED', reason: error });
    });
};

exports.getStory = (req, res, next) => {
  Story.findOne({ _id: req.params.id })
    .then((fetchedDocument) => {
      res.status(200).json({
        message: 'FETCHED_SUCCESSFULLY',
        story: fetchedDocument,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'IMAGE_NOT_FOUND', reason: error });
    });
};

exports.updateStory = (req, res, next) => {
  let imagePath = req.body.image;
  if (req.file) {
    const url = `${req.protocol}://${req.get('host')}`;
    imagePath = `${url}/images/stories/${req.file.filename}`;
  }
  const updatedStory = new Story({
    _id: req.body.id,
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    imagePath: imagePath,
  });
  Story.updateOne({ _id: req.params.id }, updatedStory)
    .then((updateResult) => {
      res
        .status(200)
        .json({ message: 'UPDATE_SUCCESSFUL', story: updatedStory });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.deleteStory = (req, res, next) => {
  Story.deleteOne({ _id: req.params.id })
    .then((deletionResult) => {
      res.status(200).json({
        message: 'DELETED_SUCCESSFULLY',
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'DELETION_FAILED', reason: error });
    });
};
