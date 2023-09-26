const healthService = require("../services/healthService");
const { MethodNotAllowedError } = require("../errors/applicationError");
exports.checkHealth = async (req, res, next) => {
  try {
    // Check if the body is an object with properties or a non-empty string
    if (
      (typeof req.body === "object" && Object.keys(req.body).length !== 0) ||
      (typeof req.body === "string" && req.body.trim().length !== 0)
    ) {
      throw new MethodNotAllowedError();
    }

    await healthService.checkDBConnection();
    res
      .status(200)
      .set("Cache-Control", "no-cache, no-store, must-revalidate;")
      .send();
  } catch (error) {
    next(error);
  }
};
