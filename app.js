const express = require("express");
const app = express();
const cors = require("cors");
const bd=require('./bd.js');
const bodyParser = require('body-parser');
const path  =require("path");


//CONSTANTS
const PORT = process.env.PORT || 8000;

const dotenv = require('dotenv');
dotenv.config({ debug: process.env.DEBUG });

//Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Secutity configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept,Content-Type,X-Requested-with,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,PATCH,PUT"
    );
    next();
});

const userRoutes = require('./routes/user');
const passwordRoutes = require('./routes/forgot_password');

//MIDDLEWARES
app.use(express.json()); //to return files as json
app.use(cors()); //for cross origin  files


//ROUTES
app.use("/api/user",userRoutes);
app.use("/api/pwd",passwordRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

