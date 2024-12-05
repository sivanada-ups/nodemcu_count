const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const cors = require("cors");

const path = require("path");

app.use(bodyParser.json());

const dotenv = require('dotenv');

dotenv.config({path:path.join(__dirname,'config.env')});

app.use(cors());

// const PORT  = 5500;
// const DB = "mongodb+srv://sivahedans14:siva1234@cluster0.2fbjv.mongodb.net/esp_data?retryWrites=true&w=majority";

mongoose.connect(process.env.DB).then(()=>{
    console.log("DB Connect")
})

const dataSchema = new mongoose.Schema({
    time:String,
    count:Number,
});
const dataModel = mongoose.model("sensordata", dataSchema)

app.post("/api/data", async(req,res)=>{
    const {time, count} = req.body;

    let data = await dataModel({
        time,
        count
    });

    await data.save();
    res.send("Data saved Successfully");
});

app.get('/get-data', (req,res)=>{
    res.send("ESP8266 Backend is running!");
});

app.get('/get-msg', (req, res) => {
    res.send("Hiiii!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is Running in : ${process.env.PORT}`)
});
