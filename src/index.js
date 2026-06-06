const express = require("express");
const app = express();

const sequelize = require("./utils/connection");

app.get("/", (req, res) => {
  res.send("Hello World");
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established");
    await sequelize.sync();
    console.log("Database Tables Created Sucessfully");
  } catch (error) {
    console.error("Database connection FAILED", error);
  }
}
connect();

app.listen(4000, () => {
  console.log("Software Management Server is running on http://localhost:4000");
});
