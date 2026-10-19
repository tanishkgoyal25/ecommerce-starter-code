const express = require('express');
const Category = express.Router();
const { CategoryGET, CategoryPOST, CategoryPUT, CategoryPATCH, CategoryDELETE } = require('../Controllers/Category.Controller');
const { Upload } = require('../Middleware/Upload.Middleware');
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { Authorization } = require('../Middleware/Authorization.Middleware');

Category.get('/', ValidID, CategoryGET);
Category.post('/', Authentication, Authorization('Administrator'), Upload('category').single('Image'), CategoryPOST);
Category.put('/:id', Authentication, Authorization('Administrator'), ValidID, Upload('category').single('Image'), CategoryPUT);
Category.patch('/:id', Authentication, Authorization('Administrator'), ValidID, CategoryPATCH);
Category.delete('/:id', Authentication, Authorization('Administrator'), ValidID, CategoryDELETE);

module.exports = { Category };