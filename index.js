const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// shoesdb
// xj1EnHywFfmz14yC


app.get('/',(req,res)=>{
    res.send('Running Comfort Server');
});

app.listen(port,()=>{
    console.log("Listening to port",port);
})


