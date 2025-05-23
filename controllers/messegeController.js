// controllers/messageController.js
const getDb = require("../models/db");


  exports.getAllMessages= async (req, res) => {
    const { messageCollection } = getDb();
    const result = await messageCollection.find().toArray();
    res.send(result);
  },

  exports.postMessage= async (req, res) => {
    const { messageCollection } = getDb();
    const message = req.body;
    const result = await messageCollection.insertOne(message);
    res.send(result);
  }
