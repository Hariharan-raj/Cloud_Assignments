const { Account } = require("./account");
const { Assignment } = require("./assignment");
// const { sequelize1 } = require("../config/db");

// Associations
Account.hasMany(Assignment, { as: "Assignments", foreignKey: "creatorId" });
Assignment.belongsTo(Account, { as: "Creator", foreignKey: "creatorId" });

module.exports = {
  Account,
  Assignment,
};
