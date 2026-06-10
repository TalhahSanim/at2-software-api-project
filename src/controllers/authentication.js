const bcrypt = require("bcrypt");
const { User } = require("../models/users");

async function login(req, res) {
  try {
    const user = await User.findOne({
      where: {
        username: req.body?.username,
        email: req.body?.email,
      },
    });
    if (!user) {
      console.log("Invalid Email or Username for login");
      return res.status(400).send("Invalid Login Credentials");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) {
      console.log("Invalid Password for login");
      return res.status(400).send("Invalid login credentials");
    }

    const token = user.generateAuthToken();
    res.send(token);
  } catch (error) {
    console.log("Internal Error");
    return res.status(503).send("Internal Error");
  }
}

module.exports = login;
