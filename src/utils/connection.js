const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database/software-database.sqlite",
  logging: false,
});

module.exports = sequelize;
