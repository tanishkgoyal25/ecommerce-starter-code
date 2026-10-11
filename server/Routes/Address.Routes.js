const express = require('express');
const Address = express.Router();
const { AddressGET, AddressPOST, AddressPUT, AddressPATCH, AddressDELETE } = require('../Controllers/Address.Controller');
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { Authorization } = require('../Middleware/Authorization.Middleware');

Address.get('/', Authentication, Authorization('Administrator', 'User'), ValidID, AddressGET);
Address.post('/', Authentication, Authorization('Administrator', 'User'), AddressPOST);
Address.put('/:id', Authentication, Authorization('Administrator', 'User'), ValidID, AddressPUT);
Address.patch('/:id', Authentication, Authorization('Administrator', 'User'), ValidID, AddressPATCH);
Address.delete('/:id', Authentication, Authorization('Administrator', 'User'), ValidID, AddressDELETE);

module.exports = { Address };