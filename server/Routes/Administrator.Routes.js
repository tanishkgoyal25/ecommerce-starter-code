const express = require('express');
const Administrator = express.Router();
const { Profile, Register, Login, Refresh, Logout, AdministratorDELETE } = require('../Controllers/Administrator.Controller');
const { ValidID } = require('../Middleware/Validator.Middleware');
const { Authentication } = require('../Middleware/Authentication.Middleware');
const { Authorization } = require('../Middleware/Authorization.Middleware');

Administrator.get('/profile', Authentication, Profile);
Administrator.post('/register', Register);
Administrator.post('/login', Login);
Administrator.get('/refresh', Refresh);
Administrator.post('/logout', Logout);
Administrator.delete('/:id', Authentication, Authorization('Administrator'), ValidID, AdministratorDELETE);

module.exports = { Administrator };