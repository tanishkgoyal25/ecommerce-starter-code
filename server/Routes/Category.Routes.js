const express = require('express');
const { CategoryGET } = require('../Controllers/Category.Controller');
const Category = express.Router();

Category.get('/', CategoryGET);

module.exports = { Category };