const app = require("./app");
const { sequelize, sequelize1 } = require("./config/db");
const { loadUsers } = require("./utils/loadUsers");
const { ensureDatabaseExists } = require("./utils/ensureDatabaseExists");
const { Account } = require("./models/account");
const { Assignment } = require("./models/assignment");
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
