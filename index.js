const express = require('express');
const userrouter = require('./routes/users');
const restaurantrouter = require('./routes/restaurant');
const bodyParser = require("body-parser");
const foodrouter = require('./routes/food');

require('dotenv').config();
const db = require('./database/db')

const port = process.env.port;

const app = express()

db.connectToMongoDB();


app.set("view engine", "ejs");
app.set("views","views");

app.get("/homepage", (req,res)=> {
    res.status(200).json({message:"this is the home page"})

})

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/food', foodrouter)

app.use('/restaurant', restaurantrouter)

app.use('/users', userrouter);

app.listen(port,()=> {
console.log(`app is listening at http://localhost:${port}`);
})