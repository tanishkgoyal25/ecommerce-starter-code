const { User } = require('../Models/User.Model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Profile = async (request, response, next) => {
     try {
          return response.status(200).json(
               {
                    Status: true,
                    Message: "User Profile",
                    Data: request.user
               }
          )
     } catch (error) {
          next(error);
     }
}

const Register = async (request, response, next) => {
     try {
          const { Name, Email, Password } = request.body;

          if (!Name?.trim() || !Email?.trim() || !Password?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Name, Email and Password are required."
                    }
               )
          }

          const Hash = crypto.createHash('sha256').update(Password).digest('hex');

          await User.create(
               {
                    Name: Name.trim(),
                    Email: Email.trim().toLowerCase(),
                    Password: Hash
               }
          )

          return response.status(201).json(
               {
                    Status: true,
                    Message: "User account created."
               }
          )
     } catch (error) {
          next(error);
     }
}

const Login = async (request, response, next) => {
     try {
          const { Email, Password } = request.body;

          if (!Email?.trim() || !Password?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Email and Password are required."
                    }
               )
          }

          const Data = await User.findOne({ Email: Email.trim().toLowerCase() });

          if (!Data) {
               return response.status(401).json(
                    {
                         Status: false,
                         Message: "Invalid Email."
                    }
               )
          }

          const Hash = crypto.createHash('sha256').update(Password).digest('hex');

          if (Hash !== Data.Password) {
               return response.status(401).json(
                    {
                         Status: false,
                         Message: "Invalid Password."
                    }
               )
          }

          if (!Data.Status) {
               return response.status(401).json(
                    {
                         Status: false,
                         Message: "Account is inactive."
                    }
               )
          }

          const Token = jwt.sign(
               {
                    ID: Data._id,
                    Role: Data.Role
               },
               process.env.JWTSecret,
               {
                    expiresIn: '10m'
               }
          )

          const RefreshToken = jwt.sign(
               {
                    ID: Data._id,
                    Role: Data.Role
               },
               process.env.JWTSecret,
               {
                    expiresIn: '25d'
               }
          )

          response.cookie(
               "RefreshToken",
               RefreshToken,
               {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 25 * 24 * 60 * 60 * 1000
               }
          )

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Login successful.",
                    Token
               }
          )
     } catch (error) {
          next(error);
     }
}

const Refresh = async (request, response, next) => {
     try {
          const RefreshToken = request.cookies.RefreshToken;

          if (!RefreshToken) {
               return response.status(401).json(
                    {
                         Status: false,
                         Message: "Refresh Token does not exist."
                    }
               )
          }

          const Decoded = jwt.verify(RefreshToken, process.env.JWTSecret);

          const Token = jwt.sign(
               {
                    ID: Decoded.ID,
                    Role: Decoded.Role
               },
               process.env.JWTSecret,
               {
                    expiresIn: '10m'
               }
          )

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Access token refreshed successfully.",
                    Token
               }
          )
     } catch (error) {
          next(error);
     }
}

const Logout = async (request, response, next) => {
     try {
          response.clearCookie(
               "RefreshToken",
               {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
               }
          )

          return response.status(200).json(
               {
                    Status: true,
                    Message: "User logged out."
               }
          )
     } catch (error) {
          next(error);
     }
}

const UserDELETE = async (request, response, next) => {
     try {
          const ID = request.params.id;

          if (request.user._id.toString() !== ID && request.user.Role !== 'Administrator') {
               return response.status(403).json(
                    {
                         Status: false,
                         Message: "Unauthorized access."
                    }
               )
          }

          const Data = await User.findByIdAndDelete(ID);

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "User does not exist."
                    }
               )
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "User deleted successfully.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

module.exports = { Profile, Register, Login, Refresh, Logout, UserDELETE };