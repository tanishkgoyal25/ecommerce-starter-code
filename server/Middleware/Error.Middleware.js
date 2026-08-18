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

          return response.status(400).json(
               {
                    Status: false,
                    Message: error.message
               }
          )
     }

     if (error.name === "FileMimeTypeError") {
          return response.status(400).json(
               {
                    Status: false,
                    Message: error.message
               }
          )
     }

     if (error.name === 'CastError') {
          return response.status(400).json(
               {
                    Status: false,
                    Message: `Invalid value for ${error.path}.`
               }
          );
     }

     if (error.name === 'ValidationError') {
          const Messages = Object.values(error.errors).map((event) => event.message);

          return response.status(400).json(
               {
                    Status: false,
                    Message: Messages.join(', ')
               }
          );
     }

     console.error(`Internal Server Error: ${error.message}`);

     return response.status(500).json(
          {
               Status: false,
               Message: "Internal Server Error"
          }
     );
}

module.exports = { Error };