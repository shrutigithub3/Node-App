const express = require("express");
const mongoose = require("mongoose");
const Router = require('./routes');
const bodyParser = require('body-parser');
const cors = require("cors");
const newrouter = require('./routes/newuser_routes');

const app=express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({limit: '5000mb',extended:true,parameterLimit:100000000}));

mongoose.connect('mongodb+srv://skumra:VPXPYhoij6wFERTH@cluster0.nefut7e.mongodb.net/usersdb?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);
app.use(newrouter);


app.listen(3002, () => {
  console.log("Server is running at port 3000");
});