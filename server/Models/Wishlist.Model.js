const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
     {
          User: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
               required: true,
               unique: true,
          },
          Products: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
               }
          ],
          Status: {
               type: Boolean,
               default: true
          }
     },
     {
          timestamps: true
     }
)

const Wishlist = mongoose.model('Wishlist', Schema);
module.exports = { Wishlist };