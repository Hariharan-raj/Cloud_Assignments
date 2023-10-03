const { ServiceUnavailableError } = require("../errors/applicationError");
const { Sequelize } = require("sequelize");

exports.checkDBConnection = async () => {
  try {
    const sequelizeWithoutDB = new Sequelize("", "root", "Hariharan1109_", {
      host: "localhost",
      dialect: "mysql",
    });
    await sequelizeWithoutDB.authenticate();
  } catch (error) {
    // console.log(error);
    throw new ServiceUnavailableError();
  }
};
