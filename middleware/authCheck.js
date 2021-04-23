const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(' ')[1];
    jwt.verify(token, 'P#LN^fVAm(?]5k?JF');
    next();
  } catch (error) {
    res.status(401).json({ message: 'NOT_AUTHORIZED' });
  }
};
