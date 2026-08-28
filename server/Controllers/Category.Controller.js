const { Category } = require("../Models/Category.Model");
const { Delete } = require("../Services/File.Service");

const CategoryGET = async (request, response, next) => {
     try {
          const { Page, Limit, ID, Name, Status, Home, Featured } = request.query;

          const Filter = {};
          const Limiter = Math.min(Math.max(Number(Limit) || 10, 1), 25);
          const CurrentPage = Math.max(Number(Page) || 1, 1);
          const Skip = (CurrentPage - 1) * Limiter;

          if (ID) Filter._id = ID;

          if (Name) Filter.Name = { $regex: Name, $options: 'i' };

          if (Status !== undefined) Filter.Status = Status === 'true';

          if (Home !== undefined) Filter.Home = Home === 'true';

          if (Featured !== undefined) Filter.Featured = Featured === 'true';

          const [Categories, Total] = await Promise.all([Category.find(Filter).sort({ createdAt: -1 }).skip(Skip).limit(Limiter).lean(), Category.countDocuments(Filter)])

          const Pages = Math.ceil(Total / Limiter);

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Categories fetched successfully using GET request.",
                    Total,
                    Page: CurrentPage,
                    Pages,
                    Limit: Limiter,
                    Categories
               }
          )
     } catch (error) {
          next(error);
     }
}

const CategoryPOST = async (request, response, next) => {
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
               await Delete("category", request.file.filename);
          }

          next(error);
     }
}

const CategoryPUT = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Name, Description } = request.body;

          const ExistingCategory = await Category.findById(ID);

          if (!ExistingCategory) {
               if (request.file) {
                    await Delete("category", request.file.filename);
               }

               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category does not exist."
                    }
               )
          }

          const UpdatedData = {}

          if (Name?.trim()) {
               UpdatedData.Name = Name.trim();
          }

          if (Description?.trim()) {
               UpdatedData.Description = Description.trim();
          }

          if (request.file) {
               UpdatedData.Image = request.file.filename;
          }

          if (Object.keys(UpdatedData).length === 0) {
               if (request.file) {
                    await Delete("category", request.file.filename);
               }

               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const UpdatedCategory = await Category.findByIdAndUpdate(ID, UpdatedData, { returnDocument: "after", runValidators: true });

          if (!UpdatedCategory) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category does not exist."
                    }
               );
          }

          if (request.file && ExistingCategory.Image && ExistingCategory.Image !== request.file.filename) {
               await Delete("category", ExistingCategory.Image);
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Category updated successfully.",
                    Data: UpdatedCategory
               }
          );
     } catch (error) {
          if (request.file) {
               await Delete("category", request.file.filename);
          }

          next(error);
     }
}

const CategoryPATCH = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Status, Home, Featured } = request.body;

          const ExistingCategory = await Category.findById(ID);

          if (!ExistingCategory) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category not found."
                    }
               );
          }

          const UpdatedData = {};

          if (Status !== undefined) {
               if (typeof Status !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Status must be a boolean."
                         }
                    );
               }

               UpdatedData.Status = Status;
          }

          if (Home !== undefined) {
               if (typeof Home !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Home must be a boolean."
                         }
                    );
               }

               UpdatedData.Home = Home;
          }

          if (Featured !== undefined) {
               if (typeof Featured !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Featured must be a boolean."
                         }
                    );
               }

               UpdatedData.Featured = Featured;
          }

          if (Object.keys(UpdatedData).length === 0) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const UpdatedCategory = await Category.findByIdAndUpdate(ID, UpdatedData, { returnDocument: "after", runValidators: true });

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Category updated successfully.",
                    Data: UpdatedCategory
               }
          );
     } catch (error) {
          next(error);
     }
}

const CategoryDELETE = async (request, response, next) => {
     try {
          const ID = request.params.id;

          const ExistingCategory = await Category.findByIdAndDelete(ID);

          if (!ExistingCategory) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Category does not exist."
                    }
               )
          }

          if (ExistingCategory.Image) {
               await Delete("category", ExistingCategory.Image);
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Category deleted successfully.",
                    Data: ExistingCategory
               }
          )
     } catch (error) {
          next(error);
     }
}

module.exports = { CategoryGET, CategoryPOST, CategoryPUT, CategoryPATCH, CategoryDELETE };