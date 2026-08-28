const express = require('express');
const Brand = express.Router();
const { BrandGET, BrandPOST, BrandPUT, BrandPATCH, BrandDELETE } = require('../Controllers/Brand.Controller');
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Upload } = require('../Middleware/Upload.Middleware');

Brand.get('/', ValidID(), BrandGET);
Brand.post('/', Upload('brand').single('Image'), BrandPOST);
Brand.put('/:id', ValidID(), Upload('brand').single('Image'), BrandPUT);
Brand.patch('/:id', ValidID(), BrandPATCH);
Brand.delete('/:id', ValidID(), BrandDELETE);

module.exports = { Brand };