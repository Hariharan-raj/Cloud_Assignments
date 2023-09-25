class ApplicationError extends Error {
  constructor(message, status) {
    super();
    this.message = message || "Something went wrong. Please try again later.";
    this.status = status || 500;
  }
}

class ServiceUnavailableError extends ApplicationError {
  constructor(message = "Service Unavailable") {
    super(message, 503);
  }
}

class MethodNotAllowedError extends ApplicationError {
  constructor(message = "Method Not Allowed") {
    super(message, 405);
  }
}

module.exports = {
  ApplicationError,
  ServiceUnavailableError,
  MethodNotAllowedError,
};
