const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
     {
          Name: {
               type: String,
               required: true,
               trim: true,
               unique: true
          },
          Description: {
               type: String,
               required: true,
               trim: true
          },
          Image: {
               type: String,
               required: true,
               trim: true
          },
          ImageURL: {
               type: String,
               required: true,
               trim: true
          },
          Status: {
               type: Boolean,
               default: true
          },
          Home: {
               type: Boolean,
               default: false
          }
     },
     {
          timestamps: true
     }
);

const Category = mongoose.model('Category', Schema);
module.exports = { Category };