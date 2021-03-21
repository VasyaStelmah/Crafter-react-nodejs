const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipes = new Schema({
  name: { type: String, require: true, unique: true, index: true },
  image: { type: String, require: true },
  subjects: [String],
});

module.exports = mongoose.model("Recipes", recipes);
