const { Brand } = require('../Models/Brand.Model');
const { Delete } = require('../Services/File.Service');

const BrandGET = async (request, response, next) => {
     try {
          const { ID, Name, Status, Featured, Home, Page, Limit } = request.query;

          const Filter = {};
          const Limiter = Math.min(Math.max(Number(Limit) || 10, 1), 25);
          const CurrentPage = Math.max(Number(Page) || 1, 1);
          const Skip = (CurrentPage - 1) * Limiter;

          if (ID) Filter._id = ID;

          if (Name) Filter.Name = { $regex: Name, $options: 'i' };

          if (Status !== undefined) Filter.Status = Status === 'true';

          if (Home !== undefined) Filter.Home = Home === 'true';

          if (Featured !== undefined) Filter.Featured = Featured === 'true';

          const [Brands, Total] = await Promise.all([Brand.find(Filter).sort({ createdAt: -1 }).skip(Skip).limit(Limiter).lean(), Brand.countDocuments(Filter)]);

          const Pages = Math.ceil(Total / Limiter);

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Brands fetched successfully.",
                    Total,
                    Page: CurrentPage,
                    Pages,
                    Limit: Limiter,
                    Brands
               }
          )
     } catch (error) {
          next(error);
     }
}

const BrandPOST = async (request, response, next) => {
     try {
          const { Name } = request.body;

          if (!Name?.trim()) {
               if (request.file) {
                    await Delete("brand", request.file.filename);
               }

               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Name is required."
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

          await Brand.create(
               {
                    Name: Name.trim(),
                    Image: request.file.filename
               }
          );

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Brand created successfully."
               }
          )
     } catch (error) {
          if (request.file) {
               await Delete("brand", request.file.filename);
          }

          next(error);
     }
}

const BrandPUT = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Name } = request.body;

          const Data = await Brand.findById(ID);

          if (!Data) {
               if (request.file) {
                    await Delete("brand", request.file.filename);
               }

               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Brand does not exist."
                    }
               )
          }

          const UpdatedData = {}

          if (Name?.trim()) {
               UpdatedData.Name = Name.trim();
          }

          if (request.file) {
               UpdatedData.Image = request.file.filename;
          }

          const UpdatedBrand = await Brand.findByIdAndUpdate(ID, UpdatedData, { returnDocument: "after", runValidators: true });

          if (request.file && Data.Image && Data.Image !== request.file.filename) {
               await Delete("brand", Data.Image);
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Brand updated successfully.",
                    Data: UpdatedBrand
               }
          );
     } catch (error) {
          if (request.file) {
               await Delete("brand", request.file.filename);
          }

          next(error);
     }
}

const BrandPATCH = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Status, Home, Featured } = request.body;

          const Data = await Brand.findById(ID);

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Brand does not exist."
                    }
               )
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

          const UpdatedBrand = await Brand.findByIdAndUpdate(ID, UpdatedData, { returnDocument: "after", runValidators: true });

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Brand updated successfully.",
                    Data: UpdatedBrand
               }
          );
     } catch (error) {
          next(error);
     }
}

const BrandDELETE = async (request, response, next) => {
     try {
          const ID = request.params.id;

          const Data = await Brand.findByIdAndDelete(ID);

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Brand does not exist."
                    }
               )
          }

          if (Data.Image) {
               await Delete("brand", Data.Image);
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Brand deleted successfully.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

module.exports = { BrandGET, BrandPOST, BrandPUT, BrandPATCH, BrandDELETE };