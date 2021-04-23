const express = require('express');
const router = express.Router();
const authValidator = require('../middleware/authValidators');
const multer = require('../middleware/stories-multer');

const storiesValidator = require('../middleware/storiesValidator');
const storyImagesController = require('../controllers/storyImages');

router.post(
  '',
  authValidator.authValidator,
  storiesValidator.storiesValidator,
  multer,
  storyImagesController.createStoryImage
);

router.get('/all/:id', storyImagesController.getStoryImages);

router.get('/:id', storyImagesController.getStoryImage);

router.patch(
  '/:id',
  authValidator.authValidator,
  multer,
  storyImagesController.updateStoryImage
);

router.delete(
  '/:id',
  authValidator.authValidator,
  storyImagesController.deleteStoryImage
);

module.exports = router;
