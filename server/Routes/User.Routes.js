const express = require('express');
const User = express.Router();
const { Profile, Register, Login, Refresh, Logout, UserDELETE } = require('../Controllers/User.Controller');
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { Authorization } = require('../Middleware/Authorization.Middleware');

User.get('/profile', Authentication, Authorization('User', 'Administrator'), Profile);
User.post('/register', Register);
User.post('/login', Login);
User.get('/refresh', Refresh);
User.post('/logout', Logout);
User.delete('/:id', Authentication, Authorization('User', 'Administrator'), ValidID, UserDELETE);

module.exports = { User };