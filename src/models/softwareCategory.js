const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const softwareCategory = sequelize.define("softwareCategory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports.softwareCategory = softwareCategory;
