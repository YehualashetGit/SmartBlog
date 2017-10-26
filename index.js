"use strict";
const express=require('express');
const mongoose=require('mongoose');
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
app.get('/',(req,res) =>{
    res.send('Hello Mean');
});

app.listen(8000,() =>{
    console.log("The app is listning on the port 8080");
});