const { ServiceUnavailableError } = require("../errors/applicationError");
const sequelize = require("../config/db");

exports.checkDBConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new ServiceUnavailableError();
  }
};
