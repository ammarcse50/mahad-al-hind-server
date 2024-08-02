const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("server is running fine");

  console.log("mahad server is running");
});

const {
  MongoClient,
  ServerApiVersion,
  Collection,
  ObjectId,
} = require("mongodb");
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
    const reviewCollection = client.db("mahadDb").collection("reviews");

    // JWT WEB TOKEN RELATED API

    app.post("/jwt", async (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });

      res.send({ token });
    });

    // VerifyToken

    const VerifyToken = async (req, res, next) => {
      console.log("inside verifyToken", req.headers.token);

      if (!req.headers.authorization) {
        return res.status(401).send({ message: "forbidden access" });
      }

      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(403).send({ message: "forbidden access" });
        }

        req.decoded = decoded;
        next();
      });
    };
    // Admin routes api

    //  app.get('/users/admin/:email',async(req,res)=>{

    //      const query = req.params.email;

    //  })

    // users section api
    app.get("/users", async (req, res) => {
      const query = { email: req.query.email };

      console.log(req.query.email);

      const result = await userCollection.find(query).toArray();
      console.log(result);

      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;

      const query = {
        email: user?.email,
      };
      const exist = await userCollection.findOne(query);
      if (exist) {
        return res.send({ message: "already exists user", insertedId: null });
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result);
      }
    });
    //       students section api

    app.get("/students", VerifyToken, async (req, res) => {
      // let query = {};
      const query = { email: req.query.email };
      // if (req.query?.email) {
      //   query = { email: req?.query?.email };
      // }
      console.log(req.query.email);

      const result = await studentCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });
    app.put("/students", async (req, res) => {
      const id = req.params.id;

      const studentUpdate = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          first_name: studentUpdate.first_name,
          last_name: studentUpdate.last_name,
          number: studentUpdate.number,
          gender: studentUpdate.gender,
          address: studentUpdate.address,
        },
      };

      const result = await studentCollection.updateOne(
        filter,
        updateDoc,
        options
      );
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

      const result = await cursor.toArray();

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

      const result = await cursor.toArray();

      res.send(result);
    });
    app.post("/courses", async (req, res) => {
      const course = req.body;

      const result = await courseCollection.insertOne(course);

      res.send(result);
    });

    /**
     * Reviews api
     *
     */

    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();

      res.send(result);
    });

    app.post("/reviews", VerifyToken, async (req, res) => {
      const review = req.body;

      const result = await reviewCollection.insertOne(review);
      res.send(result)
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
