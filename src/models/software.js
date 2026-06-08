const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Software = sequelize.define("Software", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports.Software = Software;
