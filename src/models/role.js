const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports.Role = Role;
