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
               required: true,
               maxLength: 100
          },
          Phone: {
               type: String,
               trim: true,
               required: true,
               maxLength: 25
          },
          AddressLine1: {
               type: String,
               trim: true,
               required: true,
               maxLength: 250
          },
          AddressLine2: {
               type: String,
               trim: true,
               maxLength: 250
          },
          City: {
               type: String,
               trim: true,
               required: true,
               maxLength: 100
          },
          State: {
               type: String,
               trim: true,
               required: true,
               maxLength: 100
          },
          Country: {
               type: String,
               trim: true,
               required: true,
               maxLength: 100
          },
          PostalIndexNumber: {
               type: String,
               trim: true,
               required: true,
               maxLength: 25
          },
          Default: {
               type: Boolean,
               default: false,
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

const Address = mongoose.model('Address', Schema);
module.exports = { Address };