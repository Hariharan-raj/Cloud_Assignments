const healthService = require("../services/healthService");

exports.checkHealth = async (req, res, next) => {
  try {
    await healthService.checkDBConnection();
    res
      .status(200)
      .set("Cache-Control", "no-cache, no-store, must-revalidate;")
      .send();
  } catch (error) {
    next(error);
  }
};
