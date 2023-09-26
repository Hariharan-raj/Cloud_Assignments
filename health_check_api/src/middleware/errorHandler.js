const {
  ServiceUnavailableError,
  MethodNotAllowedError,
  EndpointnotFound,
} = require("../errors/applicationError");

function errorHandler(err, req, res, next) {
  if (err instanceof ServiceUnavailableError) {
    return res
      .status(503)
      .set("Cache-Control", "no-cache, no-store, must-revalidate;")
      .send();
  }
  if (err instanceof MethodNotAllowedError) {
    return res
      .status(405)
      .set("Cache-Control", "no-cache, no-store, must-revalidate;")
      .send();
  }
  if (err instanceof EndpointnotFound) {
    return res
      .status(404)
      .set("Cache-Control", "no-cache, no-store, must-revalidate;")
      .send();
  }
  return res
    .status(405) // this should be 500 (ISE for all other errors)
    .set("Cache-Control", "no-cache, no-store, must-revalidate;")
    .send();
}

module.exports = errorHandler;
