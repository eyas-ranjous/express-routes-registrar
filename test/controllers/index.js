const HomeController = require('./homeController');
const UsersController = require('./usersController');

module.exports = {
  homeController: new HomeController(),
  usersController: new UsersController() 
};