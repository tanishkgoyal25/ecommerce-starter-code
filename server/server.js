require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();

// Middleware
server.use(cors({ origin: process.env.Client, credentials: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', express.static(path.join(__dirname, 'public')));

// Routes
const { Category } = require('./Routes/Category.Routes');
const { Error } = require('./Middleware/Error.Middleware');
const { Database } = require('./Configuration/Database.Configuration');

server.use('/api/category', Category);
server.use((request, response) => {
     response.status(404).json({
          Status: false,
          Message: `Route not found: ${request.originalUrl}`
     });
});
server.use(Error);

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