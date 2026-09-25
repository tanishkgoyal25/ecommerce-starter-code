const jwt = require('jsonwebtoken');
const { Administrator } = require('../Models/Administrator.Model');
const { User } = require('../Models/User.Model');

const Authentication = async (request, response, next) => {
     try {
          const Authorization = request.headers.authorization;

          if (!Authorization) {
               return response.status(401).json(
                    {
                         Status: false,
                         Message: "Invalid Access Token."
                    }
               )
          }

          const Token = Authorization.split(' ')[1];
          const Decoded = jwt.verify(Token, process.env.JWTSecret);

          let Data = null;

          if (Decoded.Role === 'Administrator') {
               Data = await Administrator.findById(Decoded.ID).select('-Password').lean();
          } else if (Decoded.Role === 'User') {
               Data = await User.findById(Decoded.ID).select('-Password').lean();
          }

          if (!Data) {
               return response.status(401).json(
                    {
                         Status: false,
                         Message: "Account does not exist."
                    }
               )
          }

          if (!Data.Status) {
               return response.status(401).json(
                    {
                         Status: false,
                         Message: "Account is inactive."
                    }
               );
          }

          request.user = Data;

          next();
     } catch (error) {
          next(error);
     }
}

module.exports = { Authentication };