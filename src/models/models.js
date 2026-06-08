const sequelize = require("../utils/connection");
const { User } = require("./users");
const { Software } = require("./software");

Software.hasMany(User, {
  foreignKey: "softwareId",
  onDelete: "SET NULL", //?  if the software "intance is deleted, the users 'softwareId' will be set to null"

  onUpdate: "CASCADE", //?  if the software "intance is updated, the users 'softwareId' will be updated "
});

Software.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  sequelize,
  User,
  Software,
};
