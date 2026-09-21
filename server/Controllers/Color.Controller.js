const { Color } = require('../Models/Color.Model');

const ColorGET = async (request, response, next) => {
     try {
          const { ID, Name, HEXCode, Status, Page, Limit } = request.query;

          const Filter = {};
          const Limiter = Math.min(Math.max(Number(Limit) || 10, 1), 25);
          const CurrentPage = Math.max(Number(Page) || 1, 1);
          const Skip = (CurrentPage - 1) * Limiter;

          if (ID) Filter._id = ID;

          if (Name) Filter.Name = { $regex: Name, $options: 'i' };

          if (HEXCode) Filter.HEXCode = { $regex: HEXCode, $options: 'i' };

          if (Status !== undefined) Filter.Status = Status === 'true';

          const [Colors, Total] = await Promise.all([Color.find(Filter).sort({ createdAt: -1 }).skip(Skip).limit(Limiter).lean(), Color.countDocuments(Filter)]);

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Colors fetched successfully using GET request.",
                    Total,
                    Page: CurrentPage,
                    Pages: Math.ceil(Total / Limiter),
                    Limit: Limiter,
                    Colors
               }
          )
     } catch (error) {
          next(error);
     }
}

const ColorPOST = async (request, response, next) => {
     try {
          const { Name, HEXCode } = request.body;

          if (!Name?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Name is required."
                    }
               )
          }

          if (!HEXCode?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "HEX Code is required."
                    }
               )
          }

          const Data = await Color.create(
               {
                    Name: Name.trim(),
                    HEXCode: HEXCode.trim().toUpperCase()
               }
          );

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Color created successfully.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

const ColorPUT = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Name, HEXCode } = request.body;

          const Field = {};

          if (Name?.trim()) Field.Name = Name.trim();

          if (HEXCode?.trim()) Field.HEXCode = HEXCode.trim().toUpperCase();

          if (Object.keys(Field).length === 0) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const Data = await Color.findByIdAndUpdate(ID, Field, { returnDocument: "after", runValidators: true });

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Color does not exist."
                    }
               );
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Color updated successfully.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

const ColorPATCH = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Status } = request.body;

          const Field = {};

          if (Status !== undefined) {
               if (typeof Status !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Status must be a boolean."
                         }
                    );
               }

               Field.Status = Status;
          }

          if (Object.keys(Field).length === 0) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const Data = await Color.findByIdAndUpdate(ID, Field, { returnDocument: "after", runValidators: true });

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Color does not exist.",
                    }
               )
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Color updated successfully.",
                    Data
               }
          );
     } catch (error) {
          next(error);
     }
}

const ColorDELETE = async (request, response, next) => {
     try {
          const ID = request.params.id;

          const Data = await Color.findByIdAndDelete(ID);

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Color does not exist."
                    }
               )
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Color deleted successfully.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

module.exports = { ColorGET, ColorPOST, ColorPUT, ColorPATCH, ColorDELETE };