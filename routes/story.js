const express = require('express');
const router = express.Router();
const authValidator = require('../middleware/authValidators');
const multer = require('../middleware/stories-multer');

const storiesValidator = require('../middleware/storiesValidator');
const storyController = require('../controllers/story');

router.post(
  '',
  authValidator.authValidator,
  storiesValidator.storiesValidator,
  multer,
  storyController.createStory
);

router.get('', storyController.getStories);

router.get('/:id', storyController.getStory);

router.patch(
  '/:id',
  authValidator.authValidator,
  multer,
  storyController.updateStory
);

router.delete('/:id', authValidator.authValidator, storyController.deleteStory);

module.exports = router;
