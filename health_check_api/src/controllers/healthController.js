const healthService = require("../services/healthService");

exports.checkHealth = async (req, res, next) => {
  try {
    await healthService.checkDBConnection();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
