// NPM Packages
const jwt = require('jsonwebtoken');

// Local Files
const logger = require('./logger');
const User = require('../models/user');

function errorHandler(error, request, response, next) {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
}

function tokenExtractor(request, response, next) {
  try {
    const authorization = request.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return response
        .status(401)
        .json({ message: 'Invalid authorization header' });
    }
    request.token = authorization.replace('Bearer ', '');
    next();
  } catch (error) {
    next(error);
  }
}

async function userExtractor(request, response, next) {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' });
    }
    const loggedInUser = await User.findById(decodedToken.id);
    request.user = loggedInUser;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  errorHandler,
  userExtractor,
  tokenExtractor,
};
