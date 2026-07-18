const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Storage = (Folder) => {
     const Destination = path.join(__dirname, `../public/${Folder}`);

     if (!fs.existsSync(Destination)) {
          fs.mkdirSync(Destination, { recursive: true });
     }

     return multer.diskStorage(
          {
               destination: (Request, File, Callback) => {
                    Callback(null, Destination)
               },

               filename: (Request, File, Callback) => {
                    Callback(null, File.originalname)
               }
          }
     );
};

const Upload = (Folder) => {
     return multer(
          {
               storage: Storage(Folder)
          }
     );
};

module.exports = { Upload };