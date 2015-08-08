#express-routes-registrar
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
module.exports = {
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
module.exports = {
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

// register all routes in the application
routesRegistrar.register(routes, controllers);
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