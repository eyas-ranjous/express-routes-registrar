# express-routes-registrar

[![build:?](https://travis-ci.org/eyas-ranjous/express-routes-registrar.svg?branch=master)](https://travis-ci.org/eyas-ranjous/express-routes-registrar) [![npm](https://img.shields.io/npm/dm/express-routes-registrar.svg)](https://www.npmjs.com/packages/express-routes-registrar) [![npm](https://img.shields.io/npm/v/express-routes-registrar.svg)](https://www.npmjs.com/package/express-routes-registrar) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/express-routes-registrar)

## Description 
This package gives an MVC structure for a node express app by separating routes into json files and handlers into controllers. Each routes file defines the routes to a resource in the app where keys are the allowed routes to this resource and values are the allowed http methods of each route and their handlers names. Handlers are encapsulated within controllers (controller per routes file).

## Install
```
npm install express-routes-registrar
```

## Usage 

**Defining the app routes into json files**

*`/routes/homeRoutes.json`*
```
{
    "/": {
        "GET": "index"
    }
}
```

*`/routes/usersRoutes.json`*
```
{
    "/users": {
        "GET"   : "getAll",
        "POST"  : "add"
    },
    "/users/:id": {
        "GET"   : "get",
        "PUT"   : "update",
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

const HomeController  = require('./controllers/homeController'),
      UsersController = require('./controllers/usersController');

module.exports = {
    homeController : new HomeController(),
    usersController: new UsersController()
}
```

**.create(expressApp)**

creates a routes registrar object
```javascript
const routes          = require('./routes'),
      controllers     = require('./controllers'),
      app             = require('express')(),
      routesRegistrar = require('express-routes-registrar').create(app);
```

**.register(routes, controllers)** 

registers all routes and controllers module
```javascript
routesRegistrar.register(routes, controllers);
```

**.registerRoutesJson(routesJson, controller)** 

registers a routes json file and its controller
```javascript
routesRegistrar.registerRoutesJson(routes.homeRoutes, controller.homeController);
```

**.registerRouteMethods(route, methods, controller)** 

registers a route's methods with their handlers
```javascript
let methods = routes.usersRoutes['/users'];
routesRegistrar.registerRouteMethods('/users', methods, controller.usersController);
```

**.registerRoute(route, method, handler)** 

register a route method and its handler
```javascript
routesRegistrar.registerRoute('/users/:id', 'GET', (req, res) => {
    // handle /users/:id GET
});
```

## Lint
```
grunt lint
```

## Test
```
grunt test
```

## Coverage
```
grunt coverage
```

## Build
All tasks
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/eyas-ranjous/express-routes-registrar/blob/master/LICENSE)