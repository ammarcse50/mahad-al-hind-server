// controllers/studentController.js

const { ObjectId } = require("mongodb");
const getDb = require("../models/db");

  exports.getAllStudents= async (req, res) => {
    const { studentCollection } = getDb();
    const result = await studentCollection.find().toArray();
    res.send(result);
  },

  exports.getStudentCount= async (req, res) => {
    const { studentCollection } = getDb();
    const count = await studentCollection.estimatedDocumentCount();
    res.send({ studentCount: count });
  },

  exports.getStudentByEmail= async (req, res) => {
    const { studentCollection } = getDb();
    const query = { email: req.params.email };
    const result = await studentCollection.findOne(query);
    res.send(result);
  },

  exports.updateStudentByEmail= async (req, res) => {
    const { studentCollection } = getDb();
    const email = req.query.email;
    const studentUpdate = req.body;

    const filter = { email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        ...studentUpdate,
      },
    };

    const result = await studentCollection.updateOne(filter, updateDoc, options);
    res.send(result);
  },

  exports.deleteStudent= async (req, res) => {
    const { studentCollection } = getDb();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await studentCollection.deleteOne(query);
    res.send(result);
  },

  exports.addStudent= async (req, res) => {
    const { studentCollection } = getDb();
    const student = req.body;

    const query = { email: student.email };
    const exist = await studentCollection.findOne(query);

    if (exist) {
      return res.status(404).send({ message: "Already exist", insertedId: null });
    }

    const result = await studentCollection.insertOne(student);
    res.send(result);
  }
