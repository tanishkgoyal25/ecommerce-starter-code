const multer = require("multer");
const { Storage } = require("../Configuration/Multer.Configuration");

const Upload = (Folder) => {
     return multer(
          {
               storage: Storage(Folder)
          }
     );
};

module.exports = { Upload };