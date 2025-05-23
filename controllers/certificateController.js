// controllers/certificateController.js

const { ObjectId } = require("mongodb");
const getDb = require("../models/db");


  exports.getAllCertificates= async (req, res) => {
    const { Certificate} = getDb();
    const result = await Certificate.find().toArray();
    res.send(result);
  },

  exports.getCertificateCount= async (req, res) => {
    const { getAllCertificates} = getDb();
    const count = await Certificate.estimatedDocumentCount();
    res.send({ certificateCount: count });
  },

  exports.getCertificateByEmail= async (req, res) => {
    const { Certificate} = getDb();
    const email = req.params.email;
    const query = { email };
    const result = await Certificate.findOne(query);

    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Your Course not completed yet!" });''
    }
  },

  exports.addCertificate= async (req, res) => {
    const { Certificate } = getDb();
    const query = req.body;
    const result = await Certificate.insertOne(query);
    res.send(result);
  }

  exports.checkCertificate= async(req,res)=>{
           
    const { Certificate } = getDb();
    const { email, uid } = req.body;
    const query = { email, uid };
    const result = await Certificate.findOne(query);

    if (result) {
      res.send({ message: "Certificate is valid" });
    } else {
      res.send({ message: "Certificate is not valid" });
    }
  }
