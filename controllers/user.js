const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userRegister = (req, res, next) => {
  const rememberMe = req.body.rememberMe;
  bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
    const user = new User({
      userName: req.body.userName,
      password: hashedPassword,
    });
    user
      .save()
      .then((savedUser) => {
        res.status(201).json({
          message: 'REGISTRATION_SUCCESSFUL',
        });
      })
      .catch((error) => {
        const userNameErrorType = error.errors.userName.properties.type;
        if (userNameErrorType === 'unique') {
          return res
            .status(400)
            .json({ message: 'PHONE_NUMBER_ALREADY_EXISTS', reason: error });
        } else {
          return res
            .status(400)
            .json({ message: 'REGISTRATION_FAILED', reason: error });
        }
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  let jwtExpiresIn = '1d';
  let userExpiresIn = 86400;
  const rememberMe = req.body.rememberMe;
  if (rememberMe) {
    jwtExpiresIn = '7d';
    userExpiresIn = 604800;
  }
  console.log(rememberMe);
  User.findOne({ userName: req.body.userName })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'USER_NOT_FOUND' });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((canAuthenticate) => {
      if (!canAuthenticate) {
        return res.status(401).json({ message: 'INCORRECT_PASSWORD' });
      }
      const token = jwt.sign(
        { userName: fetchedUser.userName, userId: fetchedUser._id },
        'P#LN^fVAm(?]5k?JF',
        { expiresIn: jwtExpiresIn }
      );
      res.status(200).json({
        message: 'LOGIN_SUCCESSFUL',
        response: {
          userName: fetchedUser.userName,
          token: token,
          userId: fetchedUser._id,
          expiresIn: userExpiresIn,
        },
      });
    })
    .catch((error) => {
      return res
        .status(401)
        .json({ message: 'INVALID_CREDENTIALS', reason: error });
    });
};
