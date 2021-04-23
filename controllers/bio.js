const Bio = require('../models/bio');

exports.createBio = (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const bio = new Bio({
    text: req.body.text,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    imagePath: `${url}/images/bio/${req.file.filename}`,
  });
  bio
    .save()
    .then((savedBio) => {
      res.status(200).json({
        message: 'CREATED_SUCCESSFULLY',
        bio: savedBio,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'CREATION_FAILED', reason: error });
    });
};

exports.getBio = (req, res, next) => {
  Bio.find()
    .then((fetchedDocument) => {
      res.status(200).json({
        message: 'FETCHED_SUCCESSFULLY',
        bio: fetchedDocument,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: 'IMAGE_NOT_FOUND', reason: error });
    });
};

exports.updateBio = (req, res, next) => {
  let imagePath = req.body.image;
  if (req.file) {
    const url = `${req.protocol}://${req.get('host')}`;
    imagePath = `${url}/images/bio/${req.file.filename}`;
  }
  const updatedBio = new Bio({
    _id: req.body.id,
    text: req.body.text,
    email: req.body.email,
    phoneNumber: req.body.category,
    imagePath: imagePath,
  });
  Bio.updateOne({ _id: req.params.id }, updatedBio)
    .then((updateResult) => {
      res.status(200).json({ message: 'UPDATE_SUCCESSFUL' });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
