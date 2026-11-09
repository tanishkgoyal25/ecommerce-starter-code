const mongoose = require('mongoose');
const { Wishlist } = require('../Models/Wishlist.Model');
const { Product } = require('../Models/Product.Model');

const WishlistGET = async (request, response, next) => {
     try {
          const { ID, User, Page, Limit } = request.query;

          const Filter = {};
          const Limiter = Math.min(Math.max(Number(Limit) || 10, 1), 25);
          const CurrentPage = Math.max(Number(Page) || 1, 1);
          const Skip = (CurrentPage - 1) * Limiter;

          if (ID) Filter._id = ID;

          if (request.user.Role !== 'Administrator') {
               Filter.User = request.user._id;
          } else if (User) {
               if (!mongoose.Types.ObjectId.isValid(User)) {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Invalid MongoDB ID."
                         }
                    );
               }

               Filter.User = User;
          }

          const [Wishlists, Total] = await Promise.all([Wishlist.find(Filter).populate('Products').sort({ createdAt: -1 }).skip(Skip).limit(Limiter).lean(), Wishlist.countDocuments(Filter)]);

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Wishlist fetched.",
                    Total,
                    Page: CurrentPage,
                    Pages: Math.ceil(Total / Limiter),
                    Limit: Limiter,
                    Wishlists
               }
          )
     } catch (error) {
          next(error);
     }
}

const WishlistPOST = async (request, response, next) => {
     try {
          const ID = request.body?.ID;

          if (!ID) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Product ID is required."
                    }
               )
          }

          const Products = await Product.exists({ _id: ID });

          if (!Products) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Product does not exist."
                    }
               )
          }

          const Data = await Wishlist.findOneAndUpdate({ User: request.user._id }, { $addToSet: { Products: ID } }, { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true }).populate('Products').lean();

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Product added to wishlist.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

const WishlistDELETE = async (request, response, next) => {
     try {
          const ID = request.params.id;

          const Data = await Wishlist.findOneAndUpdate({ User: request.user._id, Products: ID }, { $pull: { Products: ID } }, { returnDocument: 'after' }).populate('Products').lean();

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Product does not exist in wishlist."
                    }
               )
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Product removed from wishlist.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

module.exports = { WishlistGET, WishlistPOST, WishlistDELETE };