const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const jwt = require("jsonwebtoken");

const User = sequelize.define(
  "User",
  {
    // ? Attributes of the fields within the table

    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    softwareId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 30],
          msg: "username must be between 3 and 30 characters",
        },

        isAscii: true,
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAscii: true,
        min: 2,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 255],
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAscii: true,
        min: 8,
      },
    },
    isSysAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isIn: [[0, 1, true, false, "true", "false"]],
      },
    },
  },
  {
    // * Options for our table
  },
);
// User.sync({ alter: true });

User.prototype.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this.id,
      username: this.username,
      fullname: this.fullname,
      email: this.email,
      isSysAdmin: this.isSysAdmin,
    },
    process.env.API_PRIVATE_KEY,
  );
};
module.exports.User = User;
