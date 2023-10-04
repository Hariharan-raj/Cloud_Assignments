// const { ServiceUnavailableError } = require("../errors/applicationError");
// const { Sequelize } = require("sequelize");

// exports.checkDBConnection = async () => {
//   try {
//     const sequelizeWithoutDB = new Sequelize("", "root", "Hariharan1109_", {
//       host: "localhost",
//       dialect: "mysql",
//     });
//     await sequelizeWithoutDB.authenticate();
//   } catch (error) {
//     // console.log(error);
//     throw new ServiceUnavailableError();
//   }
// };
require("dotenv").config({ path: "../.env" });

const { ServiceUnavailableError } = require("../errors/applicationError");
const { Sequelize } = require("sequelize");

exports.checkDBConnection = async () => {
  try {
    const sequelizeWithoutDB = new Sequelize(
      "",
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
      }
    );
    await sequelizeWithoutDB.authenticate();
  } catch (error) {
    // console.log(error);
    throw new ServiceUnavailableError();
  }
};
