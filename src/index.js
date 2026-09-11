const express = require("express");
const path = require("path");

const helmet = require("helmet");
const cors = require("cors");

const envPath = path.resolve(__dirname, "../.env");
try {
  process.loadEnvFile(envPath);
} catch (_) {
  // Render injects env vars; a local .env file is optional
}
const corsOptions = require("./middleware/corsOptions");

const port = process.env.PORT || 4001;

const authSyncDB = require("./utils/authSyncDB");

const app = express();

//  * Require Routes
const software = require("./routes/software");
const users = require("./routes/users");
const softwareCategory = require("./routes/softwareCategory");
const authentication = require("./routes/authentication");

//* Connect to DB
authSyncDB();

//* Middleware

app.use(helmet());
app.use(cors(corsOptions));
app.options("/{*path}", cors(corsOptions));
app.use(express.json());
//? Parse incoming Form data, available in req.body
app.use(express.urlencoded({ extended: true }));
//* Use Routes
app.use("/api/software", software);
app.use("/api/users", users);
app.use("/api/softwareCategory", softwareCategory);
app.use("/api/login", authentication);

app.listen(port, () => {
  console.log(
    `Software Management Server is running on http://localhost:${port}`,
  );
});
