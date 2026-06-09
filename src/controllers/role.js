const { Role } = require("../models/models");
const { Software, softwareCategory } = require("../models/models");

module.exports = {
  //* GET:
  //? api/roles

  async getAllRoles(req, res) {
    try {
      const role = await Role.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["name", "ASC"]],
      });
      if (!role) {
        return res.status(404).send("No Roles located.");
      }
      res.json(role);
    } catch (error) {
      internalError(error, res);
    }
  },

  //? api/roles/:id
  async getRoleById(req, res) {
    try {
      const foundRole = await Role.findByPk(req.params.id);
      if (!foundRole) {
        return res.status(403).send("No Role Found");
      }
      res.json(foundRole);
    } catch (error) {
      internalError(error, res);
    }
  },

  //? api/roles/:name

  async getRoleByName(req, res) {
    try {
      const role = req.body;
      const foundRole = await Role.findOne({
        where: { name: req.body.name },
      });

      if (!foundRole) {
        return res.status(404).send("Role does not exist.");
      }
      res.json(foundRole);
    } catch (error) {
      internalError(error, res);
    }
  },

  // ? POST: api/roles
  async createRole(req, res) {
    try {
      // const newSoftware = req.body
      const sameRole = await Role.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (sameRole) {
        return res.status(409).send("This role already exists.");
      }

      const role = await Role.create({
        name: req.body.name,
      });
      console.log("Role created:", role);
      res.json(role);
    } catch (error) {
      internalError(error, res);
    }
  },
  //* *  PUT :
  //? api/roles/:id

  async updateRole(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send("Must include RoleId");
      }

      const [roleUpdate] = await Role.update(
        //? State the fiels that we want to change
        {
          name: req.body?.name,
        },
        //*  Where option, used to match the id sent via user
        {
          where: { id: req.params.id },
        },
      );

      if (roleUpdate === 0) {
        return res.status(404).send("Role ID was Not Found");
      }
      const role = await Role.findByPk(req.params.id);
      console.log("Sucess - Role Updated", role);
      res.json(role);
    } catch (error) {
      internalError(error, res);
    }
  },
  //* * DELETE :
  //?  api/roles/:id

  async deleteRole(req, res) {
    try {
      const role = await Role.findByPk(req.params.id);
      if (!role) {
        return res.status(404).send("Role not found");
      }
      await role.destroy();
      console.log("Success - Role Deleted:", role);
      res.json(role);
    } catch (error) {
      internalError(error, res);
    }
  },
};

function internalError(error, res) {
  console.error(error);
  res.status(503).send("Internal Error - Please revisit your input");
}
