const { DataTypes } = require("sequelize");
const { sequelize1 } = require("../config/db");

const Assignment = sequelize1.define("Assignment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 100 },
  },
  num_of_attempts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 100 },
  },
  deadline: { type: DataTypes.DATE, allowNull: false },
  assignment_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  assignment_updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = {
  Assignment,
};
