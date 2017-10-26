"use strict";
const express=require('express');
const router=express.Router();
const User = require('../models/user'); // Import User Model Schema
router.post('/register',(req,res) =>{
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
        if(!req.password) {
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
module.exports = router;