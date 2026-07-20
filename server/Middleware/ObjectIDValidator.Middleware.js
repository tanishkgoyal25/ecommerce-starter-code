const mongoose = require('mongoose');

const ObjectIDValidator = (field = 'ID', source = 'params') => {
     return (request, response, next) => {
          const value = request[source]?.[field];

          if (!value) {
               return next();
          }

          if (!mongoose.Types.ObjectId.isValid(value)) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: `Invalid ${field}.`
                    }
               );
          }

          next();
     };
};

module.exports = { ObjectIDValidator };