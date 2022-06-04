require("dotenv").config();
const express = require('express');
const session = require("express-session");
const flash = require("express-flash");

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;
const db = require("./config/db.config");



// CONFIGURATIONS
// connect to the database
db.connect((error)=>{
    if(error) throw error;
    console.log("Connected to database")
});

// setup the session configs
app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge: 120000
    }
}));

// added flash to the application for flash messages.
app.use(flash());



app.listen(PORT,(error)=>{
    if(error){ throw error; }
    console.log("Server up and running on port")
})