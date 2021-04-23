const express = require('express');
const router = express.Router();
const authValidator = require('../middleware/authValidators');
const multer = require('../middleware/bio-multer');

const bioValidator = require('../middleware/bioValidator');
const bioController = require('../controllers/bio');

router.post(
  '',
  authValidator.authValidator,
  bioValidator.bioValidator,
  multer,
  bioController.createBio
);

router.get('', bioController.getBio);

router.patch('/:id', authValidator.authValidator, bioController.updateBio);

module.exports = router;
