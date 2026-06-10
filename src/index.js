const express = require("express");
const app = express();
process.loadEnvFile("../.env");

const port = process.env.PORT || 4001;
const authSyncDB = require("./utils/authSyncDB");

//  * Require Routes
const software = require("./routes/software");
const users = require("./routes/users");
const role = require("./routes/role");
const softwareCategory = require("./routes/softwareCategory");
const authentication = require("./routes/authentication");

//* Connect to DB
authSyncDB();

//* Middleware

app.use(express.json());
//? Parse incoming Form data, available in req.body
app.use(express.urlencoded({ extended: true }));

//* Use Routes
app.use("/api/software", software);
app.use("/api/users", users);
app.use("/api/roles", role);
app.use("/api/softwareCategory", softwareCategory);
app.use("/api/login", authentication);

app.listen(port, () => {
  console.log(
    `Software Management Server is running on http://localhost:${port}`,
  );
});
