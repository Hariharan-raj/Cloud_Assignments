const healthService = require("../services/healthService");
const { badrequest } = require("../errors/applicationError");
exports.checkHealth = async (req, res, next) => {
  try {
    if (
      (typeof req.body === "object" && Object.keys(req.body).length !== 0) ||
      (typeof req.body === "string" && req.body.trim().length !== 0) ||
      Object.keys(req.query).length !== 0
    ) {
      return next(new badrequest());
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
