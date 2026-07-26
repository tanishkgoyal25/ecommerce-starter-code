const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto')

const Storage = (Folder) => {
     const Destination = path.join(__dirname, "..", "public", Folder);

     if (!fs.existsSync(Destination)) {
          fs.mkdirSync(Destination, { recursive: true });
     }

     return multer.diskStorage(
          {
               destination: (Request, File, Callback) => {
                    Callback(null, Destination)
               },

               filename: (Request, File, Callback) => {
                    const Extension = path.extname(File.originalname);
                    Callback(null, crypto.randomUUID() + Extension)
               }
          }
     );
};

module.exports = { Storage };