const express = require('express');
const Color = express.Router();
const { ColorGET, ColorPOST, ColorPUT, ColorPATCH, ColorDELETE } = require('../Controllers/Color.Controller');
const { ValidID } = require('../Middleware/Validator.Middleware');

Color.get('/', ValidID(), ColorGET);
Color.post('/', ColorPOST);
Color.put('/:id', ValidID(), ColorPUT);
Color.patch('/:id/:field', ValidID(), ColorPATCH);
Color.delete('/:id', ValidID(), ColorDELETE);

module.exports = { Color };