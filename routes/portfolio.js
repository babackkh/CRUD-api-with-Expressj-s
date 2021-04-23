const express = require('express');
const router = express.Router();
const authValidator = require('../middleware/authValidators');
const multer = require('../middleware/portfolio-multer');

const portfolioValidator = require('../middleware/portfolioValidator');
const portfolioController = require('../controllers/portfolio');

router.post(
  '',
  authValidator.authValidator,
  portfolioValidator.portfolioValidator,
  multer,
  portfolioController.createPortfolioImage
);

router.get(
  '',
  authValidator.authValidator,
  portfolioController.getPortfolioImages
);

router.get(
  '/:id',
  authValidator.authValidator,
  portfolioController.getPortfolioImage
);

router.patch(
  '/:id',
  authValidator.authValidator,
  portfolioController.updatePortfolioImage
);

router.delete(
  '/:id',
  authValidator.authValidator,
  portfolioController.deletePortfolioImage
);

module.exports = router;
