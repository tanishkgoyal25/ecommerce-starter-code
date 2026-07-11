const mongoose = require("mongoose");
const { Category } = require("../Models/Category.Model");

const CategoryGET = async (request, response) => {
     try {
          const Categories = await Category.find();

          return response.status(200).json(
               {
                    Status: true,
                    Categories
               }
          )
     } catch (error) {
          return response.status(500).json(
               {
                    Status: false,
                    Message: "Internal Server Error."
               }
          )
     }
}

const CategoryPOST = async (request, response) => {
     try {
          const Data = request.body;

          const Existing = await Category.findOne({ $or: [{ Name: Data.Name }] })

          if (Existing) {
               return response.status(409).json(
                    {
                         Status: false,
                         Message: "Category name should be unique."
                    }
               )
          }

          const category = new Category(
               {
                    Name: Data.Name,
                    Description: Data.Description,
                    Image: Data.Image
               }
          )

          await category.save();

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Category created using POST Method."
               }
          )
     } catch (error) {
          return response.status(500).json(
               {
                    Status: false,
                    Message: "Category cannot be created."
               }
          )
     }
}

const CategoryPUT = async (request, response) => {
     try {
          const ID = request.params.id;
     } catch (error) {
          return response.status(500).json(
               {
                    Status: false,
                    Message: "Internal Server Error"
               }
          )
     }
}

const CategoryPATCH = async (request, response) => {
     try {
          const ID = request.params.id;

          if (!mongoose.Types.ObjectId.isValid(ID)) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Invalid category ID."
                    }
               );
          }

          const category = await Category.findById(ID);

          if (!category) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category not found."
                    }
               );
          }

          category.Status = !category.Status;

          await category.save();

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Status updated successfully.",
                    Data: category
               }
          )
     } catch (error) {
          return response.status(500).json(
               {
                    Status: false,
                    Message: "Internal Server Error"
               }
          )
     }
}

const CategoryDELETE = async (request, response) => {
     try {
          const ID = request.params.id;

          if (!mongoose.Types.ObjectId.isValid(ID)) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Invalid category ID."
                    }
               );
          }

          const category = await Category.findByIdAndDelete(ID);

          if (!category) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category does not exist."
                    }
               )
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Category deleted successfully."
               }
          )
     } catch (error) {
          return response.status(500).json(
               {
                    Status: false,
                    Message: "Category cannot be deleted."
               }
          )
     }
}

module.exports = { CategoryGET, CategoryPOST, CategoryPUT, CategoryPATCH, CategoryDELETE };