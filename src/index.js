const express = require("express");
const app = express();
process.loadEnvFile("../.env");
const authSyncDB = require("./utils/authSyncDB");

//* Middleware

app.use(express.json());
//? Parse incoming Form data, available in req.body
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4001;
app.get("/", (req, res) => {
  res.send("Hello World");
});

authSyncDB();

app.listen(port, () => {
  console.log("Software Management Server is running on http://localhost:4000");
});
