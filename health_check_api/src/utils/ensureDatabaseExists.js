const { sequelize, sequelize1, switchDatabase } = require("../config/db");
// const Sequelize = require("sequelize");

async function ensureDatabaseExists() {
  const dbName = "assignment_portal";

  // Check if the database exists
  const databases = await sequelize.query("SHOW DATABASES", {
    type: sequelize.QueryTypes.SHOW,
  });
  const dbExists = databases.some((dbArray) => dbArray.includes(dbName));
  console.log(`Database ${dbName} exists: ${dbExists}`);

  if (!dbExists) {
    try {
      await sequelize.query(`CREATE DATABASE ${dbName}`);
    } catch (error) {
      if (error.original.code !== "ER_DB_CREATE_EXISTS") {
        throw error; // If the error is not about the database already existing, throw it.
      }
      console.warn(`Database ${dbName} already exists.`);
    }
  }

  // Close the connection manager
  await sequelize.close();

  await sequelize1.authenticate();
}

module.exports = {
  ensureDatabaseExists,
};
