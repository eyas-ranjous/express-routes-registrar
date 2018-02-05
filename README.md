# express-routes-registrar

[![build:?](https://travis-ci.org/eyas-ranjous/express-routes-registrar.svg?branch=master)](https://travis-ci.org/eyas-ranjous/express-routes-registrar) [![npm](https://img.shields.io/npm/v/express-routes-registrar.svg)](https://www.npmjs.com/package/express-routes-registrar)

## Install
```
npm install express-routes-registrar
```

## Usage 

This package enables separating the app routes into json files where keys are the routes and value is an object of all the allowed http methods of the route and their handlers. Handlers are encapsulated within controllers (controller per routes file) and each controller has the same resource name of the routes file that it handles. 

Example:

**defining the app routes**

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

**exporting routes module**

*`/routes/index.js`*
```javascript
module.exports = {
    homeRoutes: require('./homeRoutes'),
    usersRoutes: require('./usersRoutes')
}
```

**defining controllers**

*`/controllers/homeController.js`*
```javascript
class HomeController {

    index() {
        // handle / for GET
    }

}
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
```


**exporting controllers module**

/controllers/index.js
```javascript
// create an instance of each controller
// can include any factory logic to create controllers

const HomeController  = require('./controllers/homeController'),
      UsersController = require('./controllers/usersController');

module.exports = {
    homeController: new HomeController(),
    usersController: new UsersController()
}
```

**construction**
```javascript
const app             = require('express')(),
      routes          = require('./routes'),
      controllers     = require('./controllers'),
      routesRegistrar = require('express-routes-registrar').create(app);
```

**.register(routes, controllers)** registers all the routes and their controllers
```javascript
routesRegistrar.register(routes, controllers);
```

**.registerRoutesJson(routesJson, controller)** registers a routes json file and its controller
```javascript
routesRegistrar.registerRoutesJson(routes.homeRoutes, controller.homeController);
```

**.registerRouteMethods(route, methods, handler)** registers the methods of a route with their handlers
```javascript
routesRegistrar.registerRouteMethods('/users', routes.usersRoutes['/users'], controller.usersController);
```

**.registerRoute(route, method, handler)** register a route method and its handler
```javascript
routesRegistrar.registerRoute('/users/:id', 'GET', (req, res) => {
    // handle /users/:id get
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

## License
The MIT License. Full License is [here](https://github.com/eyas-ranjous/express-routes-registrar/blob/master/LICENSE)