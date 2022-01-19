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
const uri =
  "mongodb+srv://travelcoinnfts:travelcoinnfts12@cluster0.ojn33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
    const africaCollection = database.collection("africa");
    const americaCollection = database.collection("america");
    const antarcticaCollection = database.collection("antarqtica");
    const asiaCollection = database.collection("asia");
    const europeCollection = database.collection("europe");
    const oceaniaCollection = database.collection("oceania");

    // Get API
    app.get("/africa", async (req, res) => {
      const africa = await africaCollection.find({}).toArray();
      res.send(africa);
    });
    app.get("/america", async (req, res) => {
      const america = await americaCollection.find({}).toArray();
      res.send(america);
    });

    app.get("/antarctica", async (req, res) => {
      const antarctica = await antarcticaCollection.find({}).toArray();
      res.send(antarctica);
    });

    app.get("/asia", async (req, res) => {
      const asia = await asiaCollection.find({}).toArray();
      res.send(asia);
    });
    app.get("/europe", async (req, res) => {
      const europe = await europeCollection.find({}).toArray();
      res.send(europe);
    });
    app.get("/oceania", async (req, res) => {
      const oceania = await oceaniaCollection.find({}).toArray();
      res.send(oceania);
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
