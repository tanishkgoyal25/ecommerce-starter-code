const { Category } = require("../Models/Category.Model");
const { Delete } = require("../Services/File.Service");

const CategoryGET = async (request, response) => {
     try {
          const { Page, Limit, ID, Name, Status, Home, Featured } = request.query;

          const Filter = {};
          const Limiter = Math.min(Math.max(Number(Limit) || 10, 1), 25);
          const CurrentPage = Math.max(Number(Page) || 1, 1);
          const Skip = (CurrentPage - 1) * Limiter;

          if (ID) {
               Filter._id = ID;
          }

          if (Name) Filter.Name = { $regex: Name, $options: 'i' };

          if (Status !== undefined) Filter.Status = Status === 'true';

          if (Home !== undefined) Filter.Home = Home === 'true';

          if (Featured !== undefined) Filter.Featured = Featured === 'true';

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
                    Message: "Categories cannot be fetched using a GET request"
               }
          )
     }
}

const CategoryPOST = async (request, response) => {
     try {
          const { Name, Description } = request.body;

          if (!Name?.trim()) {
               if (request.file) {
                    await Delete("category", request.file.filename);
               }

               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Name is required."
                    }
               )
          }

          if (!Description?.trim()) {
               if (request.file) {
                    await Delete("category", request.file.filename);
               }

               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Description is required."
                    }
               )
          }

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
                    Name: Name.trim(),
                    Description: Description.trim(),
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
          if (request.file) {
               try {
                    await Delete("category", request.file.filename);
               } catch (error) {
                    console.error(error);
               }
          }

          console.error(error);

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
                    Message: "Category cannot be created."
               }
          );
     }
}

const CategoryPUT = async (request, response) => {
     try {
          const ID = request.params.id;
          const { Name, Description } = request.body;

          if (Name) {
               const Existing = await Category.findOne({ Name, _id: { $ne: ID } });

               if (Existing) {
                    return response.status(409).json(
                         {
                              Status: false,
                              Message: "Category with this name already exists."
                         }
                    );
               }
          }

          let UpdatedData = {
               Name,
               Description,
               Image: request.file
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
          console.error(error);

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
                    Data: Existing
               }
          )
     } catch (error) {
          console.error(error);

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

          const DeletedCategory = await Category.findByIdAndDelete(ID);

          if (!DeletedCategory) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category does not exist."
                    }
               )
          }

          Delete("category", DeletedCategory.Image);

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Category deleted successfully.",
                    Data: DeletedCategory
               }
          )
     } catch (error) {
          console.error(error);

          return response.status(500).json(
               {
                    Status: false,
                    Message: "Category cannot be deleted."
               }
          )
     }
}

module.exports = { CategoryGET, CategoryPOST, CategoryPUT, CategoryPATCH, CategoryDELETE };