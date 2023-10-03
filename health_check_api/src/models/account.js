const { DataTypes } = require("sequelize");
const { sequelize1 } = require("../config/db");
const bcrypt = require("bcrypt");

const Account = sequelize1.define("Account", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", bcrypt.hashSync(value, 10));
    },
  },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  account_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  account_updated: { type: DataTypes.DATE },
});

module.exports = {
  Account,
};
