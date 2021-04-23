const joiValidator = require("@hapi/joi");

exports.authValidator = (req, res, next) => {
  try{
    const validationSchema = joiValidator.object({
      userName: joiValidator.string().required(),
      password: joiValidator.string().required(),
      rememberMe: joiValidator.boolean().optional()
    });
    validationSchema.validate(req.body);
    next();
  } catch(error) {
    return res.status(400).json({message: "AUTHENTICATION_FAILED", reason: error})
  }
}
