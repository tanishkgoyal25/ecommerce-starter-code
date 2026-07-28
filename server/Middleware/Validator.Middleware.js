const mongoose = require('mongoose');

const ValidID = () => {
     return (request, response, next) => {
          const ID = request.params.id || request.query.ID;

          if (ID && !mongoose.Types.ObjectId.isValid(ID)) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: `Invalid MongoDB ID.`
                    }
               );
          }

          next();
     };
}

module.exports = { ValidID };