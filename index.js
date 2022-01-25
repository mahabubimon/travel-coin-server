// Require Packages
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

require("dotenv").config();

// App Create
const app = express();
const port = process.env.PORT || 5000;

// Middle Wire
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojn33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Create Client in MongoDB
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Server Run Function
const run = async () => {
  try {
    await client.connect();
    const database = client.db("travel-coin");

    // Get API
    app.get("/:region", async (req, res) => {
      const region = req.params.region;
      const regionCollection = database.collection(region);
      const regionData = await regionCollection.find({}).toArray();
      res.send(regionData);
    });
  } catch {
  } finally {
    // await client.close();
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Travel Coin Server Successfully....");
});

app.listen(port, () => {
  console.log("Running Travel Coin Server Successfully on port: ", port);
});

//  ***** Server Code End *****
