const sequelize = require("../utils/connection");
const { User } = require("./users");
const { Software } = require("./software");
const { SoftwareCategory } = require("./softwareCategory");

Software.hasMany(User, {
  foreignKey: "softwareId",
  onDelete: "SET NULL", //?  if the software "intance is deleted, the users 'softwareId' will be set to null"

  onUpdate: "CASCADE", //?  if the software "intance is updated, the users 'softwareId' will be updated "
});

Software.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

User.belongsTo(Software, {
  foreignKey: "softwareId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

SoftwareCategory.belongsTo(Software, {
  foreignKey: "softwareId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = {
  sequelize,
  User,
  Software,
  SoftwareCategory,
};
