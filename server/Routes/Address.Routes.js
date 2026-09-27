const express = require('express');
const Address = express.Router();
const { AddressGET, AddressPOST, AddressPUT, AddressPATCH, AddressDELETE } = require('../Controllers/Address.Controller');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { ValidID } = require('../Middleware/Validator.Middleware');

Address.get('/', Authentication, AddressGET);
Address.post('/', Authentication, AddressPOST);
Address.put('/:id', ValidID, Authentication, AddressPUT);
Address.patch('/:id', ValidID, Authentication, AddressPATCH);
Address.delete('/:id', ValidID, Authentication, AddressDELETE);

module.exports = { Address };