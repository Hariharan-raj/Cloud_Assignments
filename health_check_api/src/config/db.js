const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  username: "root",
  password: "Hariharan1109_",
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
