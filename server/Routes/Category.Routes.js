const express = require('express');
const Category = express.Router();
const { CategoryGET, CategoryPOST, CategoryPUT, CategoryPATCH, CategoryDELETE } = require('../Controllers/Category.Controller');
const { Upload } = require('../Configuration/Multer');

Category.get('/', CategoryGET);
Category.post('/create', Upload('category').single('Image'), CategoryPOST);
Category.put('/update/:id', CategoryPUT);
Category.patch('/update/:id', CategoryPATCH);
Category.delete('/delete/:id', CategoryDELETE);

module.exports = { Category };