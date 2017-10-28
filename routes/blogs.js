"use strict";
const express=require('express');
const User = require('../models/user-model'); // Import User Model Schema
const Blog = require('../models/blog-model'); // Import Blog Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const router=express.Router();

/* ===============================================================
     CREATE NEW BLOG
  =============================================================== */
router.post('/newBlog',(req,res)=>{
    // Check if blog title was provided
    if (!req.body.title) {
        res.json({ success: false, message: 'Blog title is required.' }); // Return error message
    } else {
        // Check if blog body was provided
        if (!req.body.body) {
            res.json({ success: false, message: 'Blog body is required.' }); // Return error message
        } else {
            // Check if blog's creator was provided
            if (!req.body.createdBy) {
                res.json({ success: false, message: 'Blog creator is required.' }); // Return error
            } else {
                // Create the blog object for insertion into database
                const blog = new Blog({
                    title: req.body.title, // Title field
                    body: req.body.body, // Body field
                    createdBy: req.body.createdBy // CreatedBy field
                });
                // Save blog into database
                blog.save((err) => {
                    // Check if error
                    if (err) {
                        // Check if error is a validation error
                        if (err.errors) {
                            // Check if validation error is in the title field
                            if (err.errors.title) {
                                res.json({ success: false, message: err.errors.title.message }); // Return error message
                            } else {
                                // Check if validation error is in the body field
                                if (err.errors.body) {
                                    res.json({ success: false, message: err.errors.body.message }); // Return error message
                                } else {
                                    res.json({ success: false, message: err }); // Return general error message
                                }
                            }
                        } else {
                            res.json({ success: false, message: err }); // Return general error message
                        }
                    } else {
                        res.json({ success: true, message: 'Blog saved!' }); // Return success message
                    }
                });
            }
        }
    }
});

module.exports=router;