const {
  ServiceUnavailableError,
  MethodNotAllowedError,
} = require("../errors/applicationError");

function errorHandler(err, req, res, next) {
  if (err instanceof ServiceUnavailableError) {
    return res.status(503).send();
  }
  if (err instanceof MethodNotAllowedError) {
    return res.status(405).send();
  }
  return res.status(500).send();
}

module.exports = errorHandler;
