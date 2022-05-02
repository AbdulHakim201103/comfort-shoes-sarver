const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qxjco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const shoesCollection = client.db("comfortShoes").collection("shoes");

        app.get('/inventory',async(req,res)=>{
            const query ={};
            const cursor = shoesCollection.find(query);
            const shoes = await cursor.toArray();
            res.send(shoes);
        });

        app.get('/inventory/:id',async(req,res)=>{
            const id = req.params.id;
            const query ={_id:ObjectId(id)};
            const shoe =await shoesCollection.findOne(query);
            res.send(shoe);
        });


    }
    finally{

    }
} 
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('Running Comfort Server');
});

app.listen(port,()=>{
    console.log("Listening to port",port);
})


