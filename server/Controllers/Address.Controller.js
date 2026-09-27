const { Address } = require('../Models/Address.Model');

const AddressGET = async (request, response, next) => {
     try {
          const { ID, User, Name, AddressLine1, AddressLine2, City, State, Country, PostalIndexNumber, Default, Status, Page, Limit } = request.query;

          const Filter = {};
          const Limiter = Math.min(Math.max(Number(Limit) || 10, 1), 25);
          const CurrentPage = Math.max(Number(Page) || 1, 1);
          const Skip = (CurrentPage - 1) * Limiter;

          if (ID) Filter._id = ID;

          if (User) Filter.User = User;

          if (Name) Filter.Name = Name;

          if (AddressLine1) Filter.AddressLine1 = AddressLine1;

          if (AddressLine2) Filter.AddressLine2 = AddressLine2;

          if (City) Filter.City = City;

          if (State) Filter.State = State;

          if (Country) Filter.Country = Country;

          if (PostalIndexNumber) Filter.PostalIndexNumber = PostalIndexNumber;

          if (Default !== undefined) Filter.Default = Default;

          if (Status !== undefined) Filter.Status = Status;

          const [Addresses, Total] = await Promise.all([Address.find(Filter).sort({ createdAt: -1 }).skip(Skip).limit(Limiter).lean(), Address.countDocuments(Filter)]);

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
          const { User, Name, AddressLine1, AddressLine2, City, State, Country, PostalIndexNumber, Default, Status } = request.body;

          if (!User?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "User is required."
                    }
               )
          }

          if (!Name?.trim()) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Name is required."
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

          const Data = await Address.create(
               {
                    User: request.user._id,
                    Name: Name.trim(),
                    AddressLine1: AddressLine1.trim(),
                    AddressLine2: AddressLine2.trim(),
                    City: City.trim(),
                    State: State.trim(),
                    Country: Country.trim(),
                    PostalIndexNumber: PostalIndexNumber.trim(),
                    Default,
                    Status
               }
          )

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
          const { User, Name, AddressLine1, AddressLine2, City, State, Country, PostalIndexNumber, Default, Status } = request.body;

          const Field = {};

          if (User?.trim()) Field.User = User.trim();

          if (Name?.trim()) Field.Name = Name.trim();

          if (AddressLine1?.trim()) Field.AddressLine1 = AddressLine1.trim();

          if (AddressLine2?.trim()) Field.AddressLine2 = AddressLine2.trim();

          if (City?.trim()) Field.City = City.trim();

          if (State?.trim()) Field.State = State.trim();

          if (Country?.trim()) Field.Country = Country.trim();

          if (PostalIndexNumber?.trim()) Field.PostalIndexNumber = PostalIndexNumber.trim();

          if (Default !== undefined) Field.Default = Default;
          
          if (Status !== undefined) Field.Status = Status;

          if (Object.keys(Field).length === 0) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No field were provided for update."
                    }
               )
          }

          const Data = await Address.findByIdAndUpdate(ID, Field, { returnDocument: 'after', runValidators: true });

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Address does not exist."
                    }
               )
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Address updated."
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

          const Data = await Address.findByIdAndUpdate(ID, Field, { returnDocument: 'after', runValidators: true });

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Address does not exist."
                    }
               )
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

          const Data = await Address.findByIdAndDelete(ID);

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Address does not exist."
                    }
               )
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