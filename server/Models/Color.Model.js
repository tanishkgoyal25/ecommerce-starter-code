const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
     {
          Name: {
               type: String,
               trim: true,
               required: true,
               unique: true
          },
          HEXCode: {
               type: String,
               trim: true,
               required: true,
               unique: true
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

const Color = mongoose.model('Color', Schema);
module.exports = { Color };