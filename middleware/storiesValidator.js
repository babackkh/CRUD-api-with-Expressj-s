const joiValidator = require('@hapi/joi');

exports.storiesValidator = (req, res, next) => {
  try {
    const validationSchema = joiValidator.object({
      title: joiValidator.string().optional(),
      description: joiValidator.string().optional(),
      location: joiValidator.string().optional(),
      caption: joiValidator.string().optional(),
      imagePath: joiValidator.string().required(),
      story: joiValidator.string().optional(),
    });
    validationSchema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: 'CREATING_FAILED', reason: error });
  }
};
