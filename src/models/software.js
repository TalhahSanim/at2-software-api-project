const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Software = sequelize.define("Software", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [5, 40],
        msg: "Software name must be between 5 to 40 characters long",
      },
    },
  },
  softwareDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
module.exports.Software = Software;
