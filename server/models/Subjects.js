const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjects = new Schema({
  name: { type: String, require: true, index: true, unique: true },
  image: { type: String, require: true },
});

module.exports = mongoose.model("Subjects", subjects);
