const Recipes = require("../models/Recipes");
const mongoose = require("mongoose");

module.exports.getAll = async function (request, response, next) {
  try {
    const recipes = await Recipes.find();
    // console.log("recipes", recipes);
    response.status(200).json(recipes);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
module.exports.getById = async function (request, response, next) {
  try {
    const { id } = request.params;
    const recipe = await Recipes.findById(id);
    response.status(200).json(recipe);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
module.exports.removeById = async function (request, response, next) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).send(`No post with id: ${id}`);
    }
    const recipe = await Recipes.findByIdAndRemove(id);
    response.status(200).json(recipe);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
module.exports.updateById = async function (request, response, next) {
  try {
    const { id } = request.params;
    const { name, image, subjects } = request.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).send(`No post with id: ${id}`);
    }
    const updateRecipe = {
      name: name,
      image: image,
      subjects: subjects,
    };
    const recipe = await Recipes.findByIdAndUpdate(id, updateRecipe, {
      new: true,
    });
    response.status(200).json(recipe);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
module.exports.create = async function (request, response, next) {
  try {
    const { name, image, subjects } = request.body;
    const recipe = new Recipes({
      name: name,
      image: image,
      subjects: subjects,
    });
    await recipe.save();
    response.status(201).json(recipe);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
