const express = require('express');
const Category = express.Router();
const { CategoryGET, CategoryPOST, CategoryPUT, CategoryPATCH, CategoryDELETE } = require('../Controllers/Category.Controller');
const { Upload } = require('../Middleware/Upload.Middleware');
const { ValidID } = require('../Middleware/Validator.Middleware');

Category.get('/', ValidID(), CategoryGET);
Category.post('/', Upload('category').single('Image'), CategoryPOST);
Category.put('/:id', ValidID(), Upload('category').single('Image'), CategoryPUT);
Category.patch('/:id/:field', ValidID(), CategoryPATCH);
Category.delete('/:id', ValidID(), CategoryDELETE);

module.exports = { Category };