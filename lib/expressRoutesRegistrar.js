/**
 * express-routes-registrar-js/ExpressRoutesRegistrar
 * @class
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

class ExpressRoutesRegistrar {
  /**
   * @param {object} app - express app instance
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * register a route, method and handler into the express app
   * @param {string} route
   * @param {string} method
   * @param {function} handler
   */
  registerRoute(route, method, handler) {
    this.app[method.toLowerCase()](route, handler);
  }

  /**
   * register all methods and handlers of a route
   * @param {string} route
   * @param {object} methods
   * @param {Controller} controller
   * @throws {Error} - when handler not found in controller
   */
  registerRouteMethods(route, methods, controller) {
    Object.keys(methods).forEach((method) => {
      const handlerName = methods[method];
      const handler = controller[handlerName];
      if (handler) {
        this.registerRoute(route, method, handler.bind(controller));
      } else {
        const controllerName = controller.constructor.name;
        const msg = `missing "${handlerName}" handler in ${controllerName}`;
        throw new Error(msg);
      }
    });
  }

  /**
   * register a routes json file and its handlers from a controller
   * @param {object} routesJson
   * @param {Controller} controller
   */
  registerRoutesJson(routesJson, controller) {
    Object.keys(routesJson).forEach((route) => {
      this.registerRouteMethods(route, routesJson[route], controller);
    });
  }

  /**
   * register a routes json module and a controller module
   * @param {object} routes
   * @param {object} controller
   */
  register(routes, controllers) {
    Object.keys(routes).forEach((route) => {
      const controllerName = route.replace('Routes', 'Controller');
      const controller = controllers[controllerName];
      this.registerRoutesJson(routes[route], controller);
    });
  }
}

module.exports = ExpressRoutesRegistrar;
