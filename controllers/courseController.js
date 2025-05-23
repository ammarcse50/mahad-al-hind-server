// controllers/courseController.js

const { ObjectId } = require("mongodb");
const courseModel = require("../models/courseModel");

  exports.getAllCourses= async (req, res) => {
    
    const result = await courseModel.find().toArray();
    res.send(result);
  },

  exports.getCourseCount= async (req, res) => {
    const count = await courseModel.estimatedDocumentCount();
    res.send({ courseCount: count });
  },

  exports.addCourse= async (req, res) => {
    const course = req.body;
    const result = await courseModel.insertOne(course);
    res.send(result);
  },

  exports.deleteCourse= async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await courseModel.deleteOne(query);
    res.send(result);
  }
