const multer = require('multer');

const Error = (error, request, response, next) => {
     if (error instanceof multer.MulterError) {
          if (error.code === 'LIMIT_FILE_SIZE') {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "File size exceeds the 10MB limit."
                    }
               );
          }
     }

     return response.status(500).json(
          {
               Status: false,
               Message: error.message
          }
     );
}

module.exports = { Error };