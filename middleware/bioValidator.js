const joiValidator = require('@hapi/joi');

exports.bioValidator = (req, res, next) => {
  try {
    const validationSchema = joiValidator.object({
      text: joiValidator.string().required(),
      email: joiValidator.string().required(),
      phoneNumber: joiValidator.string().required(),
      imagePath: joiValidator.string().required(),
    });
    validationSchema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: 'CREATING_FAILED', reason: error });
  }
};
