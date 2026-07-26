const Error = (error, request, response, next) => {
     if (error) {
          return response.status(400).json(
               {
                    Status: false,
                    Message: error.message
               }
          );
     }
     next();
}

module.exports = { Error };