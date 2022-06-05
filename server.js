require("dotenv").config();
const express = require('express');
const session = require("express-session");
const flash = require("express-flash");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = parseInt(process.env.PORT) || 3000;
const db = require("./config/db.config");
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");


// CONFIGURATIONS
// connect to the database
db.connect((error)=>{
    if(error) throw error;
    console.log("Connected to database")
});

// cors for development mode
app.use(cors({
    origin: ["https://localhost:4200","*"]
}));

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

app.use(express.json());
app.use(express.urlencoded({extended:false}))

// In the production environment this will be used to load static files. 
app.use(express.static(path.join(__dirname, "dist/*")));

// ROUTES
app.use("/", indexRouter);
app.use("/admin/", adminRouter);

app.listen(PORT,(error)=>{
    if(error){ throw error; }
    console.log("Server up and running on port");
});