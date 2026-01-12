const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.port || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

// Hubby-Website
// maBIOdL1DCT0LCpJ

const uri = `mongodb+srv://${process.env.HUBBY_NAME}:${process.env.HUBBY_PASS}@cluster0.todtdql.mongodb.net/?appName=Cluster0`;
// const uri =
//   "mongodb+srv://<db_username>:<db_password>@cluster0.todtdql.mongodb.net/?appName=Cluster0";

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

    // const hubbyCollection = client.db("hubbyDB").collection("creategroup");

    const database = client.db("createGroupDB");
    const createGroupCollection = database.collection("creategroup");

    app.get("/creategroup", async (req, res) => {
      const result = await createGroupCollection.find().toArray();
      res.send(result);
    });

    // view data er jonno

    app.get("/creategroup/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await createGroupCollection.findOne(query);
      res.send(result);
    });

    app.post("/creategroup", async (req, res) => {
      const hubbyData = req.body;
      console.log(hubbyData);
      const result = await createGroupCollection.insertOne(hubbyData);
      res.send(result);
    });

    app.delete("/creategroup/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await createGroupCollection.deleteOne(query);
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

app.get("/", (req, res) => {
  res.send("Hubby site is running!");
});

app.listen(port, () => {
  console.log(`Hubby site running on port ${port}`);
});
