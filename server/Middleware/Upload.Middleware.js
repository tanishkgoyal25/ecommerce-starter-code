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
                         Callback(new Error("Only JPEG, PNG, WebP images are allowed."));
                    }
               },

               limits: { fileSize: 10 * 1024 * 1024 },

               storage: Storage(Folder)
          }
     );
};

module.exports = { Upload };