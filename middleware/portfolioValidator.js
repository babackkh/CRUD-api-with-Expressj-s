const joiValidator = require('@hapi/joi');

exports.portfolioValidator = (req, res, next) => {
  try {
    const validationSchema = joiValidator.object({
      caption: joiValidator.string().required(),
      category: joiValidator.string().required(),
      location: joiValidator.string().required(),
      imagePath: joiValidator.string().required(),
    });
    validationSchema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: 'CREATING_FAILED', reason: error });
  }
};
