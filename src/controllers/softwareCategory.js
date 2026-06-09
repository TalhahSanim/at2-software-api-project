const { SoftwareCategory } = require("../models/models");

module.exports = {
  //* GET:
  //? api/softwareCategory

  async getAllSoftwareCategory(req, res) {
    try {
      const categories = await SoftwareCategory.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["name", "ASC"]],
      });
      if (!categories) {
        return res.status(404).send("No Software Category identified.");
      }
      res.json(categories);
    } catch (error) {
      internalError(error, res);
    }
  },

  //? api/softwareCategory/:id
  async getSoftwareCategoryById(req, res) {
    try {
      const foundSoftwareCategory = await SoftwareCategory.findByPk(
        req.params.id,
      );
      if (!foundSoftwareCategory) {
        return res.status(404).send("No Software Category identified.");
      }
      res.json(foundSoftwareCategory);
    } catch (error) {
      internalError(error, res);
    }
  },

  //? api/software/:name

  async getSoftwareByName(req, res) {
    try {
      const body = req.body;
      const foundSoftwareCategory = await SoftwareCategory.findOne({
        where: { name: body.name },
      });

      if (!foundSoftwareCategory) {
        return res.status(404).send("Software Category does not exist.");
      }
      res.json(foundSoftwareCategory);
    } catch (error) {
      internalError(error, res);
    }
  },

  // ? POST: api/softwareCategory
  async createSoftwareCategory(req, res) {
    try {
      // const newSoftwareCategory = req.body
      const sameSoftwareCategory = await SoftwareCategory.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (sameSoftwareCategory) {
        return res.status(409).send("This software category already exists.");
      }

      const publishedCategory = await SoftwareCategory.create({
        name: req.body.name,
      });
      console.log("Software Category created:", publishedCategory);
      res.json(publishedCategory);
    } catch (error) {
      internalError(error, res);
    }
  },
  //* *  PUT :
  //? api/software/:id

  async updateSoftwareCategory(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).send("Must include SoftwareCategoryId");
      }

      const [categoryUpdate] = await SoftwareCategory.update(
        {
          name: req.body?.name,
        },
        {
          where: { id: req.params.id },
        },
      );

      if (categoryUpdate === 0) {
        return res.status(404).send("Software Category ID was Not Found");
      }
      const updatedCategory = await SoftwareCategory.findByPk(req.params.id);
      console.log("Sucess - Software Category Updated", updatedCategory);
      res.json(updatedCategory);
    } catch (error) {
      internalError(error, res);
    }
  },
  //* * DELETE :
  //?  api/software/:id

  async deleteSoftwareCategory(req, res) {
    try {
      const category = await SoftwareCategory.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send("Software Category not found ");
      }
      await category.destroy();
      console.log("Success - Software Category Deleted:", category);
      res.json(category);
    } catch (error) {
      internalError(error, res);
    }
  },
};

function internalError(error, res) {
  console.error(error);
  res.status(503).send("Internal Error - Please revisit your input");
}
