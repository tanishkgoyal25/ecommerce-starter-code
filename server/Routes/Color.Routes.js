const express = require('express');
const Color = express.Router();
const { ColorGET, ColorPOST, ColorPUT, ColorPATCH, ColorDELETE } = require('../Controllers/Color.Controller');
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { Authorization } = require('../Middleware/Authorization.Middleware');

Color.get('/', ValidID, ColorGET);
Color.post('/', Authentication, Authorization('Administrator'), ColorPOST);
Color.put('/:id', Authentication, Authorization('Administrator'), ValidID, ColorPUT);
Color.patch('/:id', Authentication, Authorization('Administrator'), ValidID, ColorPATCH);
Color.delete('/:id', Authentication, Authorization('Administrator'), ValidID, ColorDELETE);

module.exports = { Color };