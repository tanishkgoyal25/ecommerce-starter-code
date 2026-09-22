const { Product } = require('../Models/Product.Model');
const { Delete } = require('../Services/File.Service');

const ProductGET = async (request, response, next) => {
     try {
          const { ID, Name, Price, Stock, Category, Brand, Color, Status, Home, Featured, Page, Limit } = request.query;

          const Filter = {};
          const Limiter = Math.min(Math.max(Number(Limit) || 10, 1), 25);
          const CurrentPage = Math.max(Number(Page) || 1, 1);
          const Skip = (CurrentPage - 1) * Limiter;

          if (ID) Filter._id = ID;

          if (Name) Filter.Name = { $regex: Name, $options: 'i' };

          if (Price) Filter.Price = Price;

          if (Stock) Filter.Stock = Stock;

          if (Category) Filter.Category = Category;

          if (Brand) Filter.Brand = Brand;

          if (Color) Filter.Color = Color;

          if (Status !== undefined) Filter.Status = Status === 'true';

          if (Home !== undefined) Filter.Home = Home === 'true';

          if (Featured !== undefined) Filter.Featured = Featured === 'true';

          const [Products, Total] = await Promise.all([Product.find(Filter).populate('Category', 'Name').populate('Brand', 'Name').populate('Color', 'Name').sort({ createdAt: -1 }).skip(Skip).limit(Limiter).lean(), Product.countDocuments(Filter)]);

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Products fetched successfully.",
                    Total,
                    Page: CurrentPage,
                    Pages: Math.ceil(Total / Limiter),
                    Limit: Limiter,
                    Products
               }
          )
     } catch (error) {
          next(error);
     }
}

const ProductPOST = async (request, response, next) => {
     try {
          const { Name, Description, Price, Stock, Category, Brand, Color, Status, Home, Featured } = request.body;

          if (!Name?.trim()) {
               if (request.files) {
                    for (const file of request.files) {
                         await Delete("product", file.filename);
                    }
               }

               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Name is required."
                    }
               )
          }

          if (!Description?.trim()) {
               if (request.files) {
                    for (const file of request.files) {
                         await Delete("product", file.filename);
                    }
               }

               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Description is required."
                    }
               )
          }

          if (!Price) {
               if (request.files) {
                    for (const file of request.files) {
                         await Delete("product", file.filename);
                    }
               }

               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Price is required"
                    }
               )
          }

          if (!request.files?.length) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "Image is required"
                    }
               )
          }

          const Data = await Product.create(
               {
                    Name: Name.trim(),
                    Description: Description.trim(),
                    Image: request.files.map(file => file.filename),
                    Stock,
                    Price,
                    Category,
                    Brand,
                    Color,
                    Status,
                    Home,
                    Featured
               }
          )

          return response.status(201).json(
               {
                    Status: true,
                    Message: "Product created.",
                    Data
               }
          )
     } catch (error) {
          if (request.files) {
               for (const file of request.files) {
                    await Delete("product", file.filename);
               }
          }

          next(error);
     }
}

const ProductPUT = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Name, Description, Price, Stock, Category, Brand, Color, Status, Home, Featured } = request.body;

          const ExistingProduct = await Product.findById(ID);

          if (!ExistingProduct) {
               if (request.files) {
                    for (const file of request.files) {
                         await Delete("product", file.filename);
                    }
               }

               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Product does not exist."
                    }
               );
          }

          const Field = {};

          if (Name?.trim()) Field.Name = Name.trim();

          if (Description?.trim()) Field.Description = Description.trim();

          if (request.files?.length > 0) Field.Image = request.files.map(file => file.filename);

          if (Price !== undefined) Field.Price = Price;

          if (Stock !== undefined) Field.Stock = Stock;

          if (Category) Field.Category = Category;

          if (Brand) Field.Brand = Brand;

          if (Color) Field.Color = Color;

          if (Status !== undefined) Field.Status = Status;

          if (Home !== undefined) Field.Home = Home;

          if (Featured !== undefined) Field.Featured = Featured;

          if (Object.keys(Field).length === 0) {
               if (request.files) {
                    for (const file of request.files) {
                         await Delete("product", file.filename);
                    }
               }

               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const UpdatedProduct = await Product.findByIdAndUpdate(ID, Field, { returnDocument: "after", runValidators: true });

          if (request.files && request.files.length > 0 && ExistingProduct.Image) {
               for (const oldImage of ExistingProduct.Image) {
                    if (!Field.Image.includes(oldImage)) {
                         await Delete('product', oldImage);
                    }
               }
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Product updated",
                    Data: UpdatedProduct
               }
          )
     } catch (error) {
          if (request.files) {
               for (const file of request.files) {
                    await Delete("product", file.filename);
               }
          }

          next(error);
     }
}

const ProductPATCH = async (request, response, next) => {
     try {
          const ID = request.params.id;
          const { Status, Home, Featured } = request.body;

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

          if (Home !== undefined) {
               if (typeof Home !== 'boolean') {
                    return response.status(400).json(
                         {
                              Status: false,
                              Message: "Home must be a boolean."
                         }
                    );
               }

               Field.Home = Home;
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

               Field.Featured = Featured;
          }

          if (Object.keys(Field).length === 0) {
               return response.status(400).json(
                    {
                         Status: false,
                         Message: "No fields provided to update."
                    }
               );
          }

          const Data = await Product.findByIdAndUpdate(ID, Field, { returnDocument: "after", runValidators: true });

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Product does not exist."
                    }
               )
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Product updated successfully.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

const ProductDELETE = async (request, response, next) => {
     try {
          const ID = request.params.id;

          const Data = await Product.findByIdAndDelete(ID);

          if (!Data) {
               return response.status(404).json(
                    {
                         Status: false,
                         Message: "Product does not exist."
                    }
               )
          }

          if (Data.Image) {
               for (const Image of Data.Image) {
                    await Delete('product', Image);
               }
          }

          return response.status(200).json(
               {
                    Status: true,
                    Message: "Product deleted successfully.",
                    Data
               }
          )
     } catch (error) {
          next(error);
     }
}

module.exports = { ProductGET, ProductPOST, ProductPUT, ProductPATCH, ProductDELETE };