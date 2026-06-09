const { Software, softwareCategory } = require("../models/models");

module.exports = {
  //* GET:
  //? api/software

  async getAllSoftware(req, res) {
    try {
      const software = await Software.findAll({
        // attributes: ["name", "softwareDescription"],
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["name", "ASC"]],
      });
      if (!software) {
        return res.status(404).send("No Software located.");
      }
      res.json(software);
    } catch (error) {
      internalError(error, res);
    }
  },

  //? api/software/:id
  async getSoftwareById(req, res) {
    try {
      const foundSoftware = await Software.findByPk(req.params.id);
      if (!foundSoftware) {
        return res.status(403).send("No Software Found");
      }
      res.json(foundSoftware);
    } catch (error) {
      internalError(error, res);
    }
  },

  //? api/software/:name

  async getSoftwareByName(req, res) {
    try {
      const software = req.body;
      const foundSoftware = await Software.findOne({
        where: { name: software.name },
      });

      if (!foundSoftware) {
        return res.status(404).send("Software does not exist.");
      }
      res.json(foundSoftware);
    } catch (error) {
      internalError(error, res);
    }
  },

  // ? POST: api/software
  async createSoftware(req, res) {
    try {
      // const newSoftware = req.body
      const sameSoftware = await Software.findOne({
        where: {
          name: req.body.name,
          softwareDescription: req.body.softwareDescription,
        },
      });

      if (sameSoftware) {
        return res.status(409).send("This software already exists.");
      }

      const software = await Software.create({
        name: req.body.name,
        softwareDescription: req.body.softwareDescription,
      });
      console.log("Software created:", software);
      res.json(software);
    } catch (error) {
      internalError(error, res);
    }
  },
  //* *  PUT :
  //? api/software/:id

  async updateSoftware(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send("Must include SoftwareId");
      }

      const [softwareUpdate] = await Software.update(
        //? State the fiels that we want to change
        {
          name: req.body?.name,
          softwareDescription: req.body?.softwareDescription,
        },
        //*  Where option, used to match the id sent via user
        {
          where: { id: req.params.id },
        },
      );

      if (softwareUpdate === 0) {
        return res.status(404).send("Software ID was Not Found");
      }
      const software = await Software.findByPk(req.params.id);
      console.log("Sucess - Software Updated", Software);
      res.json(software);
    } catch (error) {
      internalError(error, res);
    }
  },
  //* * DELETE :
  //?  api/software/:id

  async deleteSoftware(req, res) {
    try {
      const software = await Software.findByPk(req.params.id);
      if (!software) {
        return res.status(404).send("Software  not found ");
      }
      await software.destroy();
      console.log("Success - Software Deleted:", software);
      res.json(software);
    } catch (error) {
      internalError(error, res);
    }
  },
};

function internalError(error, res) {
  console.error(error);
  res.status(503).send("Internal Error - Please revisit your input");
}
