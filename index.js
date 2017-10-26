"use strict";
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const autentication=require('./routes/autentication');

const app=express();



const config=require('./config/database',(err) =>{
    if(err){
        console.log("could not connected  to the database :",err);
    }else{
        console.log("connected to database ",+config.db);
    }
});

mongoose.Promise=global.Promise;
mongoose.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// provide static directory for the front end
app.use(express.static(path.join(__dirname,'/client/src/')));
app.use('/authentication',autentication);
// connect the server to Angular 4 index.html
app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'/client/src/index.html'));
});

app.listen(8000,() =>{
    console.log("The app is listning on the port 8080");
});