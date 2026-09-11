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
    references: {
      model: "software",
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      len: {
        args: [5, 40],
        msg: "Software Category name must be between 5 to 40 characters long",
      },
    },
  },
});

module.exports.SoftwareCategory = softwareCategory;
