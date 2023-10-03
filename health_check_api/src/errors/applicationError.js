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

class EndpointnotFound extends ApplicationError {
  constructor(message = "Endpoint Not Found") {
    super(message, 404);
  }
}

class badrequest extends ApplicationError {
  constructor(message = "badrequest") {
    super(message, 400);
  }
}
class unauthorized extends ApplicationError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}
class Forbidden extends ApplicationError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}
module.exports = {
  ApplicationError,
  ServiceUnavailableError,
  MethodNotAllowedError,
  EndpointnotFound,
  badrequest,
  unauthorized,
  Forbidden,
};
