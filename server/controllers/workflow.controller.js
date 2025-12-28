const { generateSlug } = require("random-word-slugs");
const { Workflow } = require("../models/workflow.model");
const ApiError = require("../utils/errorHandler");
const mongoose = require("mongoose");
const create = async (req, res, next) => {
  try {
    const newWorkflow = new Workflow({
      name: generateSlug(3),
      userId: req.user._id,
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
    const workflow = await Workflow.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!workflow) {
      throw new ApiError(404, "Workflow not found");
    }
    return res.status(200).json(workflow);
  } catch (error) {
    next(error);
  }
};
const singleWorkflow = async (req, res, next) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!workflow) {
      throw new ApiError(404, "Workflow not found");
    } else {
      return res.status(200).json(workflow);
    }
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const workflow = await Workflow.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!workflow) {
      throw new ApiError(404, "Workflow not found");
    }
    return res.status(200).json(workflow);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, list, remove, update, singleWorkflow };
