const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
     {
          Name: {
               type: String,
               required: true,
               trim: true,
               unique: true
          },
          HEXCode: {
               type: String,
               required: true,
               trim: true
          },
          Status: {
               type: Boolean,
               default: false
          }
     },
     {
          timestamps: true
     }
)

const Color = mongoose.model('Color', Schema);
module.exports = { Color };