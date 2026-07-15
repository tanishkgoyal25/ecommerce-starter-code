const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage(
     {
          destination: (Request, File, Callback) => {
               Callback(null, 'public')
          },

          filename: (Request, File, Callback) => {
               Callback(null, File.originalname)
          }
     }
);

const upload = multer({ storage: Storage });

module.exports = { upload };