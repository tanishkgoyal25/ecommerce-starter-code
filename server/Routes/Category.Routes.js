const express = require('express');
const Category = express.Router();
const { CategoryGET, CategoryPOST, CategoryPUT, CategoryPATCH, CategoryDELETE } = require('../Controllers/Category.Controller');
const { Upload } = require('../Middleware/Upload.Middleware');
const { ValidID } = require('../Middleware/Validator.Middleware');

Category.get('/', ValidID(), CategoryGET);
Category.post('/create', Upload('category').single('Image'), CategoryPOST);
Category.put('/update/:id', ValidID(), Upload('category').single('Image'), CategoryPUT);
Category.patch('/update/:id', ValidID(), CategoryPATCH);
Category.delete('/delete/:id', ValidID(), CategoryDELETE);

module.exports = { Category };