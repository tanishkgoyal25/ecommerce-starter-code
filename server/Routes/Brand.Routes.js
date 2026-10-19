const express = require('express');
const Brand = express.Router();
const { BrandGET, BrandPOST, BrandPUT, BrandPATCH, BrandDELETE } = require('../Controllers/Brand.Controller');
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Upload } = require('../Middleware/Upload.Middleware');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { Authorization } = require('../Middleware/Authorization.Middleware');

Brand.get('/', ValidID, BrandGET);
Brand.post('/', Authentication, Authorization('Administrator'), Upload('brand').single('Image'), BrandPOST);
Brand.put('/:id', Authentication, Authorization('Administrator'), ValidID, Upload('brand').single('Image'), BrandPUT);
Brand.patch('/:id', Authentication, Authorization('Administrator'), ValidID, BrandPATCH);
Brand.delete('/:id', Authentication, Authorization('Administrator'), ValidID, BrandDELETE);

module.exports = { Brand };