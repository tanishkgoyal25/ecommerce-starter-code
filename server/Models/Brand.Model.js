const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
     {
          Name: {
               type: String,
               unique: true,
               trim: true,
               required: true,
          },
          Image: {
               type: String,
               trim: true,
               required: true,
          },
          Status: {
               type: Boolean,
               default: false,
          },
          Featured: {
               type: Boolean,
               default: false,
          },
          Home: {
               type: Boolean,
               default: false,
          }
     },
     {
          timestamps: true
     }
)

const Brand = mongoose.model('Brand', Schema);
module.exports = { Brand };