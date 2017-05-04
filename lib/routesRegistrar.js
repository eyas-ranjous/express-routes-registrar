/*!
 * express-routes-registrar
 * routesRegistrar
 * Copyright(c) 2015 Eyas Ranjous <eyas.ranjous@gmail.com>
 * MIT Licensed
 */

'use strict';

module.exports = function(app) {

    var self = {};

    self.registerRoute = function(route, method, handler) {
        app[method.toLowerCase()](route, handler);
    };

    self.registerRouteMethods = function(route, routeMthods, controller) {
        var that = this;
        Object.keys(routeMthods).forEach(function(method) {
            var handler = controller[routeMthods[method]];
            if (handler) {
                that.registerRoute(route, method, handler.bind(controller));
            }
        });
    };

    self.registerRoutesJson = function(routesJson, controller) {
        var that = this;
        Object.keys(routesJson).forEach(function(route) {
            var methods = routesJson[route];
            that.registerRouteMethods(route, methods, controller);
        });
    };

    self.register = function(routesModule, controllersModule) {
        var that = this;
        Object.keys(routesModule).forEach(function(routesName) {
            var controllerName = routesName.replace('Routes', 'Controller'),
                controller = controllersModule[controllerName];
            that.registerRoutesJson(routesModule[routesName], controller);
        });
    };

    return self;
};