const Subjects = require("../models/Subjects");
const mongoose = require("mongoose");

module.exports.getAll = async function (request, response, next) {
  try {
    const subjects = await Subjects.find();
    response.status(200).json(subjects);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
module.exports.getById = async function (request, response, next) {
  try {
    const { id } = request.params;
    const subject = await Subjects.findById(id);
    response.status(200).json(subject);
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
    const subject = await Subjects.findByIdAndRemove(id);
    response.status(200).json(subject);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
module.exports.updateById = async function (request, response, next) {
  try {
    const { id } = request.params;
    const { name, image } = request.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).send(`No post with id: ${id}`);
    }
    const updateSubject = {
      name: name,
      image: image,
    };
    const subject = await Subjects.findByIdAndUpdate(id, updateSubject, {
      new: true,
    });
    response.status(200).json(subject);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
module.exports.create = async function (request, response, next) {
  try {
    const { name, image } = request.body;
    const subject = new Subjects({
      name: name,
      image: image,
    });
    await subject.save();
    response.status(201).json(subject);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};
