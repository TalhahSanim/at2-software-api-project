const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const softwareCategory = sequelize.define("softwareCategory", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  softwareId: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports.SoftwareCategory = softwareCategory;
