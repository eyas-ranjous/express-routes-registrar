'use strict';

const HomeController  = require('./homeController'),
      UsersController = require('./usersController');

module.exports = {
    homeController : new HomeController(),
    usersController: new UsersController() 
};