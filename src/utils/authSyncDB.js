const { sequelize } = require("../models/models");

async function authSyncDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established");
    await sequelize.sync({ alter: true });
    console.log("Database Tables Created Sucessfully");
  } catch (error) {
    console.error("Database connection FAILED", error);
  }
}

module.exports = authSyncDB;
