const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Software = sequelize.define("Software", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  softwareDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
});
module.exports.Software = Software;
