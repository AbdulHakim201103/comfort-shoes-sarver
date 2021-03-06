require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 4000;
const app = express();

// middleware
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qxjco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const shoesCollection = client.db("comfortShoes").collection("shoes");

    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = shoesCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //  findOnes
    app.get("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await shoesCollection.findOne(query);
      res.send(result);
    });

    // add product
    app.post("/product", async (req, res) => {
      const product = req.body.data;
      const result = await shoesCollection.insertOne(product);
      console.log(result);
      res.send(result);
    });

    // get product
    app.get("/product", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = shoesCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // update
    app.put("/inventory/:id", async (req, res) => {
      const quantity = req.body.totalQuantity;
      const sold = req.body.totalSold;
      const id = req.body.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: { quantity: quantity, sold: sold },
      };
      const result = await shoesCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    
    // delete
    app.delete("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await shoesCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Comfort Server update");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
