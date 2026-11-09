const express = require('express');
const Wishlist = express.Router();
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { Authorization } = require('../Middleware/Authorization.Middleware');
const { WishlistGET, WishlistPOST, WishlistDELETE } = require('../Controllers/Wishlist.Controller');

Wishlist.get('/', Authentication, Authorization('User', 'Administrator'), ValidID, WishlistGET);
Wishlist.post('/', Authentication, Authorization('User', 'Administrator'), ValidID, WishlistPOST);
Wishlist.delete('/:id', Authentication, Authorization('User', 'Administrator'), ValidID, WishlistDELETE);

module.exports = { Wishlist };