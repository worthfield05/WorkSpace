const { generateSlug } = require("random-word-slugs");
const { Workflow } = require("../models/workflow.model");
const ApiError = require("../utils/errorHandler");
const mongoose = require("mongoose");
const create = async (req, res, next) => {
  try {
    const user = req.user;
    const newWorkflow = new Workflow({
      name: generateSlug(3),
      userId: user._id,
    });
    await newWorkflow.save();
    return res.status(201).json(newWorkflow);
  } catch (error) {
    next(error);
  }
};
const list = async (req, res, next) => {
  try {
    const workflows = await Workflow.find({ userId: req.user._id });
    return res.status(200).json(workflows);
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError(400, "Invalid workflow id"));
    }
    const workflow = await Workflow.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });
    if (!workflow) {
      return next(ApiError(404, "Workflow not found"));
    }
    return res
      .status(200)
      .json({ message: "Workflow deleted", data: workflow });
  } catch (error) {
    next(error);
  }
};
const singleWorkflow = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError(400, "Invalid workflow id"));
    }
    const workflow = await Workflow.findOne({ _id: id, userId: req.user._id });
    if (!workflow) {
      return next(ApiError(404, "Workflow not found"));
    } else {
      return res.status(200).json(workflow);
    }
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError(400, "Invalid workflow id"));
    }
    if (!name || !name.trim()) {
      return next(ApiError(400, "Please enter workflow name"));
    }

    const workflow = await Workflow.findOneAndUpdate(
      {
        _id: id,
        userId: req.user._id,
      },
      {
        name: name.trim(),
      },
      { new: true }
    );
    if (!workflow) {
      return next(ApiError(404, "Workflow not found"));
    }
    return res
      .status(200)
      .json({ message: "Workflow updated successfully", data: workflow });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, list, remove, update, singleWorkflow };
