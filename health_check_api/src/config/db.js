// const Sequelize = require("sequelize");
// require("dotenv").config({ path: "../../db.env" });

// let sequelize = new Sequelize({
//   database: "mysql",
//   //database: "test", //for dabian
//   username: "root",
//   password: "Hariharan1109_",
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
// });

// let sequelize1 = new Sequelize({
//   database: "assignment_portal",
//   username: "root",
//   password: "Hariharan1109_",
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
// });
// function switchDatabase(dbName) {
//   //sequelize.close();
//   sequelize = new Sequelize({
//     database: dbName,
//     username: "root",
//     password: "Hariharan1109_",
//     host: "localhost",
//     dialect: "mysql",
//     logging: false,
//   });
//   console.log("here3");
// }

// module.exports = {
//   switchDatabase,
//   sequelize,
//   sequelize1,
// };
require("dotenv").config({ path: "../.env" });

const Sequelize = require("sequelize");

let sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

let sequelize1 = new Sequelize({
  database: process.env.TEST_DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

function switchDatabase(dbName) {
  sequelize = new Sequelize({
    database: dbName,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  });
}

module.exports = {
  switchDatabase,
  sequelize,
  sequelize1,
};
