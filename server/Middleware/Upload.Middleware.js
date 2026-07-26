const multer = require("multer");
const path = require("path");
const { Storage } = require("../Configuration/Multer.Configuration");

const Upload = (Folder) => {
     return multer(
          {
               fileFilter: (Request, File, Callback) => {
                    const AllowedTypes = /jpeg|jpg|png|webp/;
                    const Extension = AllowedTypes.test(
                         path.extname(File.originalname).toLowerCase()
                    );

                    const MimeType = AllowedTypes.test(File.mimetype);

                    if (Extension && MimeType) {
                         Callback(null, true);
                    } else {
                         Callback(new Error("Only image files are allowed"));
                    }
               },

               limits: { fileSize: 10 * 1024 * 1024 },

               storage: Storage(Folder)
          }
     );
};

module.exports = { Upload };