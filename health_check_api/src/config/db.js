const Sequelize = require("sequelize");

let sequelize = new Sequelize({
  database: "mysql",
  //database: "test", //for dabian
  username: "root",
  password: "Hariharan1109_",
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

let sequelize1 = new Sequelize({
  database: "assignment_portal",
  username: "root",
  password: "Hariharan1109_",
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
function switchDatabase(dbName) {
  //sequelize.close();
  sequelize = new Sequelize({
    database: dbName,
    username: "root",
    password: "Hariharan1109_",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
  console.log("here3");
}

module.exports = {
  switchDatabase,
  sequelize,
  sequelize1,
};
