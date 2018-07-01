# express-routes-registrar

[![build:?](https://travis-ci.org/eyas-ranjous/express-routes-registrar.svg?branch=master)](https://travis-ci.org/eyas-ranjous/express-routes-registrar) [![npm](https://img.shields.io/npm/dm/express-routes-registrar.svg)](https://www.npmjs.com/packages/express-routes-registrar) [![npm](https://img.shields.io/npm/v/express-routes-registrar.svg)](https://www.npmjs.com/package/express-routes-registrar) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/express-routes-registrar)

## Description 
Adds an MVC structure to a node express app by separating routes into json files and handlers into controllers. Routes are defined as json files that hold the methods and handler names of each route while Handlers are defined in controllers.

## Install
```
npm install express-routes-registrar
```

## Usage 

**Defining the app routes into json files**

*`/routes/homeRoutes.json`*
```json
{
  "/": {
    "GET": "index"
  }
}
```

*`/routes/usersRoutes.json`*
```json
{
  "/users": {
    "GET": "getAll",
    "POST": "add"
  },
  "/users/:id": {
    "GET": "get",
    "PUT": "update",
    "DELETE": "remove"
  }
}
```

**Exporting routes module**

*`/routes/index.js`*
```javascript
module.exports = {
  homeRoutes : require('./homeRoutes'),
  usersRoutes: require('./usersRoutes')
}
```

**Defining handlers into controllers**

*`/controllers/homeController.js`*
```javascript
class HomeController {
  index() {
    // handle / for GET
  }
}

module.exports = HomeController;
```

*`/controllers/usersController.js`*
```javascript
class UsersController {
  getAll(req, res) {
    // handle /users GET
  }

  add(req, res) {
    // handle /users POST
  }

  get(req, res) {
    // handle /users/:id GET
  }

  update(req, res) {
    // handle /users/:id PUT
  }

  remove(req, res) {
    // handle /users/:id DELETE
  }
}

module.exports = UsersController;
```


**Exporting controllers module**

*`/controllers/index.js`*
```javascript
// create an instance of each controller
// can include any factory logic to create controllers

const HomeController  = require('./controllers/homeController');
const UsersController = require('./controllers/usersController');

module.exports = {
  homeController : new HomeController(),
  usersController: new UsersController()
}
```

**create the registrar**

creates a routes registrar object
```javascript
const routes = require('./routes');
const controllers = require('./controllers');
const app = require('express')();
const routesRegistrar = require('express-routes-registrar')(app);
```

**.register(routes, controllers)** 

registers all routes and controllers
```javascript
routesRegistrar.register(routes, controllers);
```

**.registerRoutesJson(routesJson, controller)** 

registers a routes file and its controller
```javascript
routesRegistrar.registerRoutesJson(routes.homeRoutes, controller.homeController);
```

**.registerRouteMethods(route, methods, controller)** 

registers a route's methods and their controller
```javascript
const methods = routes.usersRoutes['/users'];
routesRegistrar.registerRouteMethods(
  '/users',
  methods,
  controller.usersController
);
```

**.registerRoute(route, method, handler)** 

register a route method and its handler
```javascript
routesRegistrar.registerRoute('/users/:id', 'GET', (req, res) => {
  // handle /users/:id GET
});
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/eyas-ranjous/express-routes-registrar/blob/master/LICENSE)
