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
          Stock: {
               type: Number,
               default: 0,
               min: 0
          },
          Price: {
               type: Number,
               required: true,
               min: 0
          },
          Image: [{
               type: String,
               required: true,
               trim: true
          }],
          Category: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Category'
               }
          ],
          Brand: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Brand'
          },
          Color: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Color'
               }
          ],
          Status: {
               type: Boolean,
               default: false
          },
          Home: {
               type: Boolean,
               default: false
          },
          Featured: {
               type: Boolean,
               default: false
          }
     },
     {
          timestamps: true
     }
)

const Product = mongoose.model('Product', Schema);
module.exports = { Product };