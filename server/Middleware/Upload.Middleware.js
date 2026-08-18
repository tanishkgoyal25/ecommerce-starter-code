const multer = require("multer");
const { Storage } = require("../Configuration/Multer.Configuration");

const Upload = (Folder) => {
     return multer(
          {
               fileFilter: (Request, File, Callback) => {
                    const AllowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

                    if (AllowedTypes.includes(File.mimetype)) {
                         Callback(null, true);
                    } else {
                         const error = new Error("Only JPEG, PNG, and WebP images are allowed.");
                         error.name = "FileMimeTypeError";
                         Callback(error)
                    }
               },

               limits: { fileSize: 10 * 1024 * 1024 },

               storage: Storage(Folder)
          }
     );
};

module.exports = { Upload };