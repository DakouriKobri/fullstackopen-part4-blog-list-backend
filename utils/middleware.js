// Local Files
const logger = require('./logger');

function errorHandler(error, request, response, next) {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
}

module.exports = {
  errorHandler,
};
