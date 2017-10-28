"use strict";
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const autentication=require('./routes/autentication');
const blogs=require('./routes/blogs');
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const config=require('./config/database');
const app=express();



// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could NOT connect to database: ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});

// middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// provide static directory for the front end
app.use(express.static(path.join(__dirname,'/client/src/')));
app.use('/authentication',autentication);
app.use('/blog',blogs);
// connect the server to Angular 4 index.html
app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'/client/src/index.html'));
});

app.listen(8080,() =>{
    console.log("The app is listning on the port 8080");
});
module.exports=app;
