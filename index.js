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
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/inventory',async(req,res)=>{
            console.log("req",req);
            res.send('success')
        });

        app.delete('/inventory/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id: ObjectId(id)};
            const result = await shoesCollection.deleteOne(query);
            res.send(result);
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


