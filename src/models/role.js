const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports.Role = Role;
