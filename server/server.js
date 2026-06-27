require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

// Middleware
server.use(cors());
server.use(express.json());

// Routes
const { Category } = require('./Routes/Category.Routes');

server.use('/api/category', Category);

// Database
mongoose.connect(
     process.env.MongoDBURI, { dbName: process.env.DBName }
).then(
     () => {
          console.log("Connected to database.");

          server.listen(
               process.env.Port,
               () => {
                    console.log(`Server initialized on port ${process.env.Port}.`);
               }
          )
     }
).catch(
     (error) => {
          console.log(`Unable to connect to database due to ${error.message}`);
     }
)