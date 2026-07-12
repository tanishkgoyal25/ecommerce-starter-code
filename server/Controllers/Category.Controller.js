const mongoose = require("mongoose");
const { Category } = require("../Models/Category.Model");

const CategoryGET = async (request, response) => {
     try {
          const { page = 1, limit = 10, search = "", status, sort = "createdAt", order = "desc" } = request.query;

          const filter = {};

          if (search) {
               filter.Name = {
                    $regex: search,
                    $options: "i"
               };
          }

          if (status !== undefined) {
               filter.Status = status === "true";
          }

          const skip = (Number(page) - 1) * Number(limit);

          const [categories, total] = await Promise.all(
               [
                    Category.find(filter).sort({ [sort]: order === "asc" ? 1 : -1 }).skip(skip).limit(Number(limit)).lean(),

                    Category.countDocuments(filter)
               ]
          );

          return response.status(200).json(
               {
                    Status: true,
                    Total: total,
                    CurrentPage: Number(page),
                    TotalPages: Math.ceil(total / limit),
                    Count: categories.length,
                    Categories: categories
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

          const Existing = await Category.findOne({ Name: Data.Name });

          if (Existing) {
               return response.status(409).json(
                    {
                         Status: false,
                         Message: "Category name should be unique."
                    }
               );
          }

          const category = new Category(
               {
                    Name: Data.Name,
                    Description: Data.Description,
                    Image: Data.Image
               }
          );

          await category.save();

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Category created successfully."
               }
          );
     } catch (error) {
          return response.status(500).json(
               {
                    Status: false,
                    Message: "Category cannot be created.",
                    Error: error.message
               }
          );
     }
}

const CategoryPUT = async (request, response) => {
     try {
          const ID = request.params.id;
          const Data = request.body;

          if (!mongoose.Types.ObjectId.isValid(ID)) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Invalid category ID."
                    }
               );
          }

          if (Data.Name) {
               const Existing = await Category.findOne({ Name: Data.Name, _id: { $ne: ID } });

               if (Existing) {
                    return response.status(409).json(
                         {
                              Status: false,
                              Message: "Another category with this name already exists."
                         }
                    );
               }
          }

          let UpdatedData = {
               Name: Data.Name,
               Description: Data.Description,
               Image: Data.Image
          };

          const UpdatedCategory = await Category.findByIdAndUpdate(ID, UpdatedData, { returnDocument: "after", runValidators: true });

          if (!UpdatedCategory) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category cannot be updated."
                    }
               );
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Category updated successfully.",
                    Data: UpdatedCategory
               }
          );

     } catch (error) {
          return response.status(500).json(
               {
                    Status: false,
                    Message: "Internal Server Error"
               }
          );
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