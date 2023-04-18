const express = require("express");
const bodyParser = require('body-parser');
const userControllers=require('../controllers/newuser');
const cors = require("cors");

const app2 = express();
app2.use(cors());
app2.use(bodyParser.urlencoded({limit: '5000mb',extended:true,parameterLimit:100000000}));

app2.post('/formuser',userControllers.formuser)
app2.get('/newusers',userControllers.newusers)
app2.get('/newusersID/:id',userControllers.getuserId)
app2.put('/putusers/:id',userControllers.putusers)
app2.delete('/deleteusers/:id',userControllers.deleteusers)

app2.post('/SignIn',userControllers.SignIn)
app2.post('/sendEmail',userControllers.sendEmail)

module.exports = app2;
