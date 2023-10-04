require("dotenv").config({ path: "./.env" });
const app = require("./src/app");
const { sequelize, sequelize1 } = require("./src/config/db");
const { loadUsers } = require("./src/utils/loadUsers");
const { ensureDatabaseExists } = require("./src/utils/ensureDatabaseExists");
const { Account } = require("./src/models/account");
const { Assignment } = require("./src/models/assignment");

const port = 8080;
console.log("here");
ensureDatabaseExists()
  .then(() => {
    console.log(
      "Database check complete. Continue with rest of the application..."
    );
    // If you want to sync your sequelize models
    return sequelize1.sync({ alter: true });
  })
  .then(() => {
    // Load any required initial data
    return loadUsers();
  })
  .then(() => {
    // Now, you can start your server
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Initialization error:", err);
  });
