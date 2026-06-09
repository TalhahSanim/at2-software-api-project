const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    foreignKey: true,
    references: {
      model: "User",
      key: "id",
    },
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports.Role = Role;
