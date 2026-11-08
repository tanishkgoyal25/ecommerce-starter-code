const mongoose = require('mongoose');
const { Address } = require('../Models/Address.Model');

const AddressGET = async (request, response, next) => {
     try {
          const { ID, Phone, User, Name, AddressLine1, AddressLine2, City, State, Country, PostalIndexNumber, Default, Status, Page, Limit } = request.query;

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

          if (Name) Filter.Name = Name;

          if (Phone) Filter.Phone = Phone;

          if (AddressLine1) Filter.AddressLine1 = AddressLine1;

          if (AddressLine2) Filter.AddressLine2 = AddressLine2;

          if (City) Filter.City = City;

          if (State) Filter.State = State;

          if (Country) Filter.Country = Country;

          if (PostalIndexNumber) Filter.PostalIndexNumber = PostalIndexNumber;

          if (Default !== undefined) Filter.Default = Default === 'true';

          if (Status !== undefined) Filter.Status = Status === 'true';

          const [Addresses, Total] = await Promise.all([Address.find(Filter).sort({ Default: -1, createdAt: -1 }).skip(Skip).limit(Limiter).lean(), Address.countDocuments(Filter)]);

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Address fetched",
                    Total,
                    Page: CurrentPage,
                    Pages: Math.ceil(Total / Limiter),
                    Limit: Limiter,
                    Addresses
               }
          )
     } catch (error) {
          next(error);
     }
}

const AddressPOST = async (request, response, next) => {
     try {
          const { Name, Phone, AddressLine1, AddressLine2, City, State, Country, PostalIndexNumber, Default, Status } = request.body;

          if (!Name?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Name is required."
                    }
               )
          }

          if (!Phone?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Phone is required."
                    }
               )
          }

          if (!AddressLine1?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Address Line 1 is required."
                    }
               )
          }

          if (AddressLine2 !== undefined && AddressLine2 !== null && typeof AddressLine2 !== 'string') {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Address Line 2 must be a string."
                    }
               )
          }

          if (!City?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "City is required."
                    }
               )
          }

          if (!State?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "State is required."
                    }
               )
          }

          if (!Country?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Country is required."
                    }
               )
          }

          if (!PostalIndexNumber?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Postal Index Number is required."
                    }
               )
          }

          if (Status !== undefined) {
               if (typeof Status !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Status must be a boolean."
                         }
                    );
               }
          }

          if (Default !== undefined) {
               if (typeof Default !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Default must be a boolean."
                         }
                    );
               }
          }

          const Total = await Address.countDocuments({ User: request.user._id });

          const Primary = Total === 0 ? true : Boolean(Default);

          const Data = await Address.create(
               {
                    User: request.user._id,
                    Name: Name.trim(),
                    Phone: Phone.trim(),
                    AddressLine1: AddressLine1.trim(),
                    AddressLine2: AddressLine2,
                    City: City.trim(),
                    State: State.trim(),
                    Country: Country.trim(),
                    PostalIndexNumber: PostalIndexNumber.trim(),
                    Default: Primary,
                    Status
               }
          )

          if (Primary) {
               await Address.updateMany({ User: request.user._id, _id: { $ne: Data._id } }, { $set: { Default: false } });
          }

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Address created.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

const AddressPUT = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Name, Phone, AddressLine1, AddressLine2, City, State, Country, PostalIndexNumber, Default, Status } = request.body;

          const Field = {};

          if (Name?.trim()) Field.Name = Name.trim();

          if (Phone?.trim()) Field.Phone = Phone.trim();

          if (AddressLine1?.trim()) Field.AddressLine1 = AddressLine1.trim();

          if (AddressLine2 !== undefined && typeof AddressLine2 !== 'string') {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Address Line 2 must be a string."
                    }
               );
          }

          if (AddressLine2 !== undefined) Field.AddressLine2 = AddressLine2.trim();

          if (City?.trim()) Field.City = City.trim();

          if (State?.trim()) Field.State = State.trim();

          if (Country?.trim()) Field.Country = Country.trim();

          if (PostalIndexNumber?.trim()) Field.PostalIndexNumber = PostalIndexNumber.trim();

          if (Default !== undefined) {
               if (typeof Default !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Default must be a boolean."
                         }
                    );
               }

               Field.Default = Default;
          }

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
                         Message: "No fields were provided for update."
                    }
               )
          }

          const Query = { _id: ID };

          if (request.user.Role !== 'Administrator') {
               Query.User = request.user._id;
          }

          const Data = await Address.findOneAndUpdate(Query, Field, { returnDocument: 'after', runValidators: true });

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Address does not exist."
                    }
               )
          }

          if (Field.Default === true) {
               await Address.updateMany({ User: Data.User, _id: { $ne: Data._id } }, { $set: { Default: false } });
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Address updated.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

const AddressPATCH = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Status, Default } = request.body;

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

          if (Default !== undefined) {
               if (typeof Default !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Default must be a boolean."
                         }
                    );
               }

               Field.Default = Default;
          }

          if (Object.keys(Field).length === 0) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const Query = { _id: ID };

          if (request.user.Role !== 'Administrator') {
               Query.User = request.user._id;
          }

          const Data = await Address.findOneAndUpdate(Query, Field, { returnDocument: 'after', runValidators: true });

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Address does not exist."
                    }
               )
          }

          if (Default === true) {
               await Address.updateMany({ User: Data.User, _id: { $ne: Data._id } }, { $set: { Default: false } });
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Address updated.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

const AddressDELETE = async (request, response, next) => {
     try {
          const ID = request.params.id;

          const Query = { _id: ID };

          if (request.user.Role !== 'Administrator') {
               Query.User = request.user._id;
          }

          const Data = await Address.findOneAndDelete(Query);

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Address does not exist."
                    }
               )
          }

          if (Data.Default) {
               await Address.findOneAndUpdate({ User: Data.User, Status: true }, { $set: { Default: true } }, { sort: { createdAt: -1 } });
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Address deleted successfully.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

module.exports = { AddressGET, AddressPOST, AddressPUT, AddressPATCH, AddressDELETE };