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

          const Pages = Math.ceil(Total / Limiter);

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Colors fetched successfully using GET request.",
                    Total,
                    Page: CurrentPage,
                    Pages,
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

          await Color.create(
               {
                    Name: Name.trim(),
                    HEXCode: HEXCode.trim().toUpperCase()
               }
          );

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Color created successfully."
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

          const ExistingColor = await Color.findById(ID);

          if (!ExistingColor) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Color does not exist."
                    }
               )
          }

          const Data = {};

          if (Name?.trim()) {
               Data.Name = Name.trim();
          }

          if (HEXCode?.trim()) {
               Data.HEXCode = HEXCode.trim().toUpperCase();
          }

          if (Object.keys(Data).length === 0) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const UpdatedColor = await Color.findByIdAndUpdate(ID, Data, { returnDocument: "after", runValidators: true });

          if (!UpdatedColor) {
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
                    Data: UpdatedColor
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

          const ExistingColor = await Color.findById(ID);

          if (!ExistingColor) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Color not found."
                    }
               );
          }

          const Data = {};

          if (Status !== undefined) {
               if (typeof Status !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Status must be a boolean."
                         }
                    );
               }

               Data.Status = Status;
          }

          if (Object.keys(Data).length === 0) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const UpdatedColor = await Color.findByIdAndUpdate(ID, Data, { returnDocument: "after", runValidators: true });

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Color updated successfully.",
                    Data: UpdatedColor
               }
          );
     } catch (error) {
          next(error);
     }
}

const ColorDELETE = async (request, response, next) => {
     try {
          const ID = request.params.id;

          const ExistingColor = await Color.findByIdAndDelete(ID);

          if (!ExistingColor) {
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
                    Data: ExistingColor
               }
          )
     } catch (error) {
          next(error);
     }
}

module.exports = { ColorGET, ColorPOST, ColorPUT, ColorPATCH, ColorDELETE };