require('dotenv').config();

const express = require('express');
const cors = require('cors');

const server = express();

// Middleware
server.use(cors({ origin: process.env.Client }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes
const { Category } = require('./Routes/Category.Routes');
const { Database } = require('./Configuration/Database');

server.use('/api/category', Category);

const Server = async () => {
     try {
          await Database();

          server.listen(
               process.env.Port,
               () => {
                    console.log(`Server initialized on port ${process.env.Port}.`);
               }
          )
     } catch (error) {
          console.error(error);
          process.exit(1);
     }
}

Server();