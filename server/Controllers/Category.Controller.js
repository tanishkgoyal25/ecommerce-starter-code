const { Category } = require("../Models/Category.Model");

const CategoryGET = async (request, response) => {
     try {
          const Categories = await Category.find();

          response.status(200).json(
               {
                    Status: true,
                    Categories
               }
          )
     } catch (error) {
          console.error(error)
          
     }
}

module.exports = { CategoryGET };