const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  username: { type: String, require: true },
  email: {
    type: String,
    unique: true,
    require: true,
    index: true,
  },
  password: String,
});

module.exports = mongoose.model("Users", users);
