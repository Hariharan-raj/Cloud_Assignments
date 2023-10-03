const fs = require("fs");
const Papa = require("papaparse");
const { Account } = require("../models");

const loadUsers = async () => {
  const csvFile = fs.readFileSync(
    "C:\\Users\\hr093\\Downloads\\users.csv",
    "utf8"
  );
  const results = Papa.parse(csvFile, { header: true });

  for (let user of results.data) {
    console.log(`Processing user: ${user.first_name}`);
    console.log(`Processing user: ${JSON.stringify(user)}`);

    // Check if all the required fields are present
    const { first_name, last_name, email, password } = user;

    if (!first_name || !last_name || !email || !password) {
      console.log(
        `Incomplete data for user ${
          user.email ? user.email : "Unknown"
        }. Skipping user creation.`
      );
      continue; // Skip to the next iteration without processing this user
    }

    try {
      // Use the Account model to find or create a new user
      const [account, created] = await Account.findOrCreate({
        where: { email: user.email },
        defaults: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
        },
      });

      // If you want to log or handle the newly created accounts differently, you can use the `created` flag
      if (created) {
        console.log(`New account created for ${user.email}`);
      }
    } catch (error) {
      console.error(`Error while processing ${user.email}: ${error.message}`);
    }
  }

  console.log("End of CSV processing.");
};

module.exports = {
  loadUsers,
};
