const { User, Software, Role } = require("../models/models");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports = {
  //* POST
  //? api/users
  async createUser(req, res) {
    console.log("Creating User", req.body);
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const [user, created] = await User.findOrCreate({
        where: {
          username: req.body.username,
          fullname: req.body.fullname,
          email: req.body.email,
          password: hashedPassword,
        },
      });

      if (!created) {
        return res.status(409).send("This User already exists");
      }
      console.log("Success - User created:", user);
      const token = user.generateAuthToken();
      res.header("x-auth-token", token);
      let userData = _.pick(user, ["id", "username", "fullname", "email"]);
      userData.token;

      res.json(userData);
    } catch (error) {
      internalError(error, res);
    }
  },

  //* * GET:
  //? api/users/:id
  async getUserById(req, res) {
    console.log("Getting User: " + req.params.id);
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "isSysAdmin"],
        },
      });
      if (!user) {
        return res.status(404).send("No User Found.");
      }
      console.log("User Found: ", user);
      res.json(user);
    } catch (error) {
      internalError(error, res);
    }
  },
  //* * PUT:
  // ? api/users/:id
  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).send("No User Found.");
      }

      const updateData = {
        username: req.body?.username,
        fullname: req.body?.fullname,
        email: req.body?.email,
        password: req.body?.password,
      };
      if (req.body.softwareName) {
        const software = await Software.findOne({
          where: { name: req.body.softwareName },
        });
        if (!software) {
          return res.status(404).send("No Software Found.");
        }
        updateData.SoftwareId = software.id;
      }
      await user.update(updateData);
      const updatedData = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "isSysAdmin"],
        },
        include: [
          {
            model: Software,
            attributes: ["name", "softwareDescription"],
          },
        ],
      });
      console.log("Success - User Updated:", updateData);
      res.json(updatedData);
    } catch (error) {
      internalError(error, res);
    }
  },
  // ! ! DELETE:
  //? api/users/:id

  async deleteUser(req, res) {
    console.log("Deleting User: " + req.params.id);
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).send("No User Found.");
      }
      await user.destroy();
      console.log("Success -User Deleted:", user);
      res.json("The User has been deleted successfully.");
    } catch (error) {
      internalError(error, res);
    }
  },
};

function internalError(error, res) {
  console.error(error);
  if (error.errors?.[0]?.message) {
    return res.status(409).send(error.errors[0].message);
  }
  res.status(503).send("Internal Error - Please revisit your input");
}
