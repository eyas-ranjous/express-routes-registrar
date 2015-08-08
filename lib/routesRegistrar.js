/*!
 * express-routes-registrar
 * routesRegistrar
 * Copyright(c) 2015 Eyas Ranjous <eyas@eyasranjous.info>
 * MIT Licensed
 */

module.exports = function(app) {

    'use strict';

    function registerRoute(route, method, handler) {
        app[method.toLowerCase()](route, handler);
    }

    function registerRouteMethods(route, routeMthods, controller) {
        Object.keys(routeMthods).forEach(function(method) {
            var handler = controller[routeMthods[method]];
            if (handler) {
                registerRoute(route, method, handler);
            }
        });
    }

    function registerRoutesJson(routesJson, controller) {
        Object.keys(routesJson).forEach(function(route) {
            var methods = routesJson[route];
            registerRouteMethods(route, methods, controller);
        });
    }

    function register(routesModule, controllersModule) {
        Object.keys(routesModule).forEach(function(routesName) {
            var controllerName = routesName.replace('Routes', 'Controller'),
                controller = controllersModule[controllerName];

            registerRoutesJson(routesModule[routesName], controller);
        });
    }

    return {
        registerRoute: registerRoute,
        registerRouteMethods: registerRouteMethods,
        registerRoutesJson: registerRoutesJson,
        register: register
    };

};