const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t9lecvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

const connectDB = async () => {
  await client.connect();
  console.log("MongoDB connected successfully!");
};

module.exports = {
  connectDB,
  client,
  userCollection: client.db("mahadDb").collection("users"),
  studentCollection: client.db("mahadDb").collection("students"),
  messageCollection: client.db("mahadDb").collection("messages"),
  courseCollection: client.db("mahadDb").collection("courses"),
  reviewCollection: client.db("mahadDb").collection("reviews"),
  certificateCollection: client.db("mahadDb").collection("certificates"),
};
