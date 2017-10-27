"use strict";
const express=require('express');
const router=express.Router();
const User = require('../models/user-model'); // Import User Model Schema
router.post('/register',(req,res) =>{
    console.log("email:",req.body.email);
    console.log("username:",req.body.username);
    console.log("password :",req.body.password);
    if(!req.body.username){
        res.json({
            success:false,
            message:"you must provide user-name"
        });
    }
    if(!req.body.email){
        res.json({
            success:false,
            message:"you must provide an email"
        });
    }
    else {
        if(!req.body.password) {
            res.json({
                success:false,
                message:"you must provide password"
            });
        }else {
            let user=new User({
                email:req.body.email,
                username:req.body.username,
                password:req.body.password
            });
            user.save((err) =>{
                if(err) {
                    if(err.code === 11000){
                        res.json({
                            success:false,
                            message:"User name or email Already exist"
                        });
                    }
                    else{
                        if(err.errors){
                            if(err.errors.email){
                                res.json({
                                    success:false,
                                    message:err.errors.email.message
                                });
                            }
                            if(err.errors.username)
                            {
                                res.json({
                                    success:false,
                                    message:err.errors.username.message
                                });
                            }else{
                                if(err.errors.password)
                                {
                                    res.json({
                                        success:false,
                                        message:err.errors.password.message
                                    });
                                }
                                else{
                                    res.json({
                                        success:false,
                                        message:err
                                    });
                                }
                            }
                        }
                        res.json({
                            success:false,
                            message:"Could Not save the user. Error "+err
                        });
                    }
                }else{
                    res.json({
                        success:true,
                        message:"Account  is Created"
                    });
                }
            })
        }
    }

});
/* ============================================================
    Route to check if user's email is available for registration
 ============================================================ */
router.get('/checkEmail/:email', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.email) {
        res.json({ success: false, message: 'E-mail was not provided' }); // Return error
    } else {
        // Search for user's e-mail in database;
        User.findOne({ email: req.params.email }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err }); // Return connection error
            } else {
                // Check if user's e-mail is taken
                if (user) {
                    res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
                } else {
                    res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
                }
            }
        });
    }
});
/* ===============================================================
   Route to check if user's username is available for registration
=============================================================== */
router.get('/checkUsername/:username', (req, res) => {
    // Check if username was provided in paramaters
    if (!req.params.username) {
        res.json({ success: false, message: 'Username was not provided' }); // Return error
    } else {
        // Look for username in database
        User.findOne({ username: req.params.username }, (err, user) => {
            // Check if connection error was found
            if (err) {
                res.json({ success: false, message: err }); // Return connection error
            } else {
                // Check if user's username was found
                if (user) {
                    res.json({ success: false, message: 'Username is already taken' }); // Return as taken username
                } else {
                    res.json({ success: true, message: 'Username is available' }); // Return as vailable username
                }
            }
        });
    }
});
module.exports = router;