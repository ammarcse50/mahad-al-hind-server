const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("server is running fine");

  console.log("mahad server is running");
});

const { MongoClient, ServerApiVersion, Collection } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t9lecvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("mahadDb").collection("users");
    const studentCollection = client.db("mahadDb").collection("students");
    const messageCollection = client.db("mahadDb").collection("messages");
    const courseCollection = client.db("mahadDb").collection("courses");

    app.get("/users", async (req, res) => {
      const users = req.body;
      const cursor = userCollection.find();

      const result =await cursor.toArray();

      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const users = req.body;

      const result = await userCollection.insertOne(users);
      res.send(result);
    });

    app.get("/students", async (req, res) => {

      const cursor = studentCollection.find();

      const result =await cursor.toArray();
         console.log(result)
      res.send(result);
    });
    app.post("/students", async (req, res) => {
      const students = req.body;

      console.log(students);
      const result = await studentCollection.insertOne(students);

      res.send(result);
    });

    // message collection api

    app.get("/contact", async (req, res) => {
      const cursor = messageCollection.find();

      const result =await cursor.toArray();

      res.send(result);
    });
    app.post("/contact", async (req, res) => {
      const message = req.body;

      const result = await messageCollection.insertOne(message);

      res.send(result);
    });
    // courses  api

    app.get("/courses", async (req, res) => {
      const cursor = courseCollection.find();

      const result =await cursor.toArray();

      res.send(result);
    });
    app.post("/courses", async (req, res) => {

      const course = req.body;

      const result = await courseCollection.insertOne(course);

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
