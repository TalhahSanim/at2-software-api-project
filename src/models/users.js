const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const { FULL } = require("sqlite3");
const User = sequelize.define(
  "User",
  {
    // ? Attributes of the fields within the table
    //

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    softwareId: {
      type: DataTypes.UUID,
      allowNull: true,
      foreignKey: true,
      references: {
        model: "Software",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSysAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // * Options for our table
  },
);
// User.sync({ alter: true });
module.exports.User = User;
