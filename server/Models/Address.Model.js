const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
     {
          User: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
               required: true
          },
          Name: {
               type: String,
               trim: true,
               required: true
          },
          AddressLine1: {
               type: String,
               trim: true,
               required: true
          },
          AddressLine2: {
               type: String,
               trim: true,
          },
          City: {
               type: String,
               trim: true,
               required: true
          },
          State: {
               type: String,
               trim: true,
               required: true
          },
          Country: {
               type: String,
               trim: true,
               required: true,
          },
          PostalIndexNumber: {
               type: String,
               trim: true,
               required: true
          },
          Default: {
               type: Boolean,
               default: false,
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

const Address = mongoose.model('Address', Schema);
module.exports = { Address };