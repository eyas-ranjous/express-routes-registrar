#express-routes-registrar

[![build:?](https://travis-ci.org/eyas-ranjous/express-routes-registrar.svg?branch=master)](https://travis-ci.org/eyas-ranjous/express-routes-registrar) [![npm](https://img.shields.io/npm/v/express-routes-registrar.svg)](https://www.npmjs.com/package/express-routes-registrar)

This package works with a convention that separates the routes in json files where routes are the keys that contains all the allowed http method and their handlers function names (which exist in controllers).

Example:

/routes/home.json
```
{
    "/": {
        "GET": "index"
    }
}
```

/routes/users.json
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

Now routes can be exported as a module

/routes/index.js
```javascript
module.exports {
    homeRoutes: require('./homeRoutes'),
    usersRoutes: require('./usersRoutes')
}
```

And the same way controllers can be created, each routes json has its own controller that is named after the json file and concatenated with 'Controller' word, it defines the handlers of the routes methods.

/controllers/homeController.js
```javascript
module.exports = function() {
    function index(req, res) {
        // handle route / for GET
    }

    return {
        index: index
    };
};
```

/controllers/usersController.js
```javascript
module.exports = function() {
    function getAll(req, res) {
        // handle route /users for GET
    }

    function add(req, res) {
        // handle route /users for POST
    }

    function get(req, res) {
        // handle route /users/:id for GET
    }

    function update(req, res) {
        // handle route /users/:id for PUT
    }

    function remove(req, res) {
        // handle route /users/:id for DELETE
    }

    return {
        getAll: getAll,
        add: add,
        get: get,
        update: update,
        remove: remove
    };
};
```

And export the controllers as a module

/controllers/index.js
```javascript
// create an instance of each controller
module.exports {
    homeController: require('./homeController')(),
    usersController: require('./usersController')()
}
```

By following this convention, the package can be used to register the routes by passing the modules.

##Install
```
npm install express-routes-registrar
```

##Usage 
```javascript
var app = require('express')(),
    routes = require('./routes'), // routes module
    controllers = require('./controllers'), // controllers module
    // Create an instance of the registrar
    routesRegistrar = require('express-routes-registrar')(app);
```

After an instance is created, we can register all the routes
```javascript
routesRegistrar.register(routes, controllers);
```

You can also register one routes json
```javascript
routesRegistrar.registerRoutesJson(routes.homeRoutes, controller.homeController);
```

Or registering the methods of a route
```javascript
routesRegistrar.registerRouteMethods('/users', routes.usersRoutes['/users'], controller.usersController);
```

Or registering on method of a route
```javascript
routesRegistrar.registerRoute('/users/:id', 'GET', function(req, res) {
    // handle /users/:id get
});
```


##Lint
```
grunt lint
```

##Test
```
grunt test
```

##License
The MIT License. Full License is [here](https://github.com/eyas-ranjous/express-routes-registrar/blob/master/LICENSE)