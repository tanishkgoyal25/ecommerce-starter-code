const express = require('express');
const Product = express.Router();
const { ProductGET, ProductPOST, ProductPUT, ProductPATCH, ProductDELETE } = require('../Controllers/Product.Controller');
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Upload } = require('../Middleware/Upload.Middleware');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { Authorization } = require('../Middleware/Authorization.Middleware');

Product.get('/', ValidID, ProductGET);
Product.post('/', Authentication, Authorization('Administrator'), Upload('product').array('Image', 5), ProductPOST);
Product.put('/:id', Authentication, Authorization('Administrator'), ValidID, Upload('product').array('Image', 5), ProductPUT);
Product.patch('/:id', Authentication, Authorization('Administrator'), ValidID, ProductPATCH);
Product.delete('/:id', Authentication, Authorization('Administrator'), ValidID, ProductDELETE);

module.exports = { Product };