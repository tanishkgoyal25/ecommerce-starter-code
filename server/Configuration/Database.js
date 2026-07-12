const mongoose = require('mongoose');

const Database = async () => {
     try {
          await mongoose.connect(
               process.env.MongoDBURI,
               {
                    dbName: process.env.DBName
               }
          );

          console.log("Connected to database.");
     } catch (error) {
          console.log(`Unable to connect to database due to ${error.message}`);
          process.exit(1);
     }
}

module.exports = { Database };