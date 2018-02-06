'use strict';

class ExpressRoutesRegistrar {

    constructor(expressApp) {
        this.expressApp = expressApp;
    }

    /**
     * @public
     * register a route, method and handler into the express app
     * @param {string} route
     * @param {string} method
     * @param {function} handler
     */
    registerRoute(route, method, handler) {
        this.expressApp[method.toLowerCase()](route, handler);
    }

    /**
     * @public
     * register all methods and handlers of a route 
     * @param {string} route
     * @param {object} routeMethods
     * @param {Controller} controller
     */
    registerRouteMethods(route, methods, controller) {
        for (let method in methods) {
            let handler = controller[methods[method]];
            if (handler) {
                this.registerRoute(route, method, handler.bind(controller));
            }
            else {
                throw new Error(`handler "${methods[method]}" not found in ${route} controller`);
            }
        }
    }

    /**
     * @public
     * register a routes json file and its handlers from a controller
     * @param {object} routesJson
     * @param {Controller} controller
     */
    registerRoutesJson(routesJson, controller) {
        let that = this;
        for (let route in routesJson) {
            this.registerRouteMethods(route, routesJson[route], controller);
        }
    }

    /**
     * @public
     * register a routes json module and a controller module
     * @param {object} routes
     * @param {object} controller
     */
    register(routes, controllers) {
        for (let routeName in routes) {
            let controllerName = routeName.replace('Routes', 'Controller'),
                controller = controllers[controllerName];
            this.registerRoutesJson(routes[routeName], controller);
        }
    }

}

module.exports = ExpressRoutesRegistrar;