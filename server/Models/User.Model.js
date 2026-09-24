const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
     {
          Name: {
               type: String,
               trim: true,
               required: true
          },
          Email: {
               type: String,
               unique: true,
               trim: true,
               lowercase: true,
               required: true
          },
          Password: {
               type: String,
               trim: true,
               required: true
          },
          Role: {
               type: String,
               enum: 'User',
               default: 'User',
               required: true
          },
          Status: {
               type: Boolean,
               default: true
          }
     },
     {
          timestamps: true
     }
)

const User = mongoose.model('User', Schema);
module.exports = { User };