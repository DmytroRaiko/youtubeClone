const jwt = require('jsonwebtoken');
const handleError = require('../error');
const { jwt: jwtSecret } = require('../config')

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) next(handleError(401, "You are not authorized!"))

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) next(handleError(403, "Token is not valid!"));

    req.user = user;
    next();
  })
};
