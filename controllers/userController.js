
// controllers/userController.js
const { ObjectId } = require("mongodb");
const { userCollection } = require("../models/db");


// const userCollection = client.db("mahadDb").collection("users");

exports.getAllUsers = async (req, res) => {
  const users = await userCollection.find().toArray();
  res.send(users);
};

exports.getUserByEmail = async (req, res) => {
  const user = await userCollection.findOne({ email: req.query.email });
  res.send(user);
};

exports.checkAdminStatus = async (req, res) => {
  const email = req.params.email;
  if (email !== req.decoded.email) {
    return res.status(401).send({ message: "Forbidden Access" });
  }
  const user = await userCollection.findOne({ email });
  res.send({ Admin: user?.role === "admin" });
};

exports.promoteToAdmin = async (req, res) => {
  const id = req.params.id;
  const result = await userCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: "admin" } }
  );
  res.send(result);
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

exports.createUser = async (req, res) => {
  const user = req.body;
  const exist = await userCollection.findOne({ email: user?.email });
  if (exist) return res.send({ message: "already exists user", insertedId: null });
  const result = await userCollection.insertOne(user);
  res.send(result);
};

exports.countUsers = async (req, res) => {
  const count = await userCollection.estimatedDocumentCount();
  res.send({ userCount: count });
};