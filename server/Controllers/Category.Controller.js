const mongoose = require("mongoose");
const { Category } = require("../Models/Category.Model");

const CategoryGET = async (request, response) => {
     try {
          const { Page, Limit, ID, Name, Status } = request.query;

          const Filter = {};
          const Limiter = Math.min(Math.max(Number(Limit) || 10, 1), 25);
          const CurrentPage = Math.max(Number(Page) || 1, 1);
          const Skip = (CurrentPage - 1) * Limiter;

          if (ID) Filter._id = ID;
          if (Name) Filter.Name = { $regex: Name, $options: 'i' };
          if (Status !== undefined) Filter.Status = Status === 'true';

          const [Categories, Total] = await Promise.all([Category.find(Filter).sort({ createdAt: -1 }).skip(Skip).limit(Limiter).lean(), Category.countDocuments(Filter)])

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Categories fetched successfully using GET request.",
                    Total,
                    Page: CurrentPage,
                    Limit: Limiter,
                    Categories
               }
          )
     } catch (error) {
          console.error(error);

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
          const { Name, Description } = request.body;

          if (!request.file) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Image is required."
                    }
               )
          }

          await Category.create(
               {
                    Name,
                    Description,
                    Image: request.file.filename
               }
          );

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Category created successfully."
               }
          );
     } catch (error) {
          if (error.code === 11000) {
               return response.status(409).json(
                    {
                         Status: false,
                         Message: "Category already exists."
                    }
               );
          }

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

          const Existing = await Category.findById(ID);

          if (!Existing) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category not found."
                    }
               );
          }

          Existing.Status = !Existing.Status;

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