const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname,'./config.env')});

const dbSource = process.env.MONGO_URL;

const dbConnect = mongoose.connect(
    dbSource,
    {
       // options:true
    },() => {
                console.log(`Connected to DB! ${dbSource}`);
            }
);

module.exports = dbConnect;