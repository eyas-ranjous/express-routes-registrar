/**
 * express-routes-registrar
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

module.exports = (app) => {
  /**
   * @param {string} route
   * @param {string} method
   * @param {function} handler
   */
  const registerRoute = (route, method, handler) =>
    app[method.toLowerCase()](route, handler);

  /**
   * @param {string} route
   * @param {object} methods
   * @param {Controller} controller
   * @throws {Error} - when handler not found in controller
   */
  const registerRouteMethods = (route, methods, controller) => {
    Object.keys(methods).forEach((method) => {
      const handlerName = methods[method];
      const handler = controller[handlerName];
      if (handler) {
        registerRoute(route, method, handler.bind(controller));
      } else {
        const controllerName = controller.constructor.name;
        const msg = `missing "${handlerName}" handler in ${controllerName}`;
        throw new Error(msg);
      }
    });
  };

  /**
   * @param {object} routesJson
   * @param {Controller} controller
   */
  const registerRoutesJson = (routesJson, controller) => {
    Object.keys(routesJson).forEach((route) => {
      registerRouteMethods(route, routesJson[route], controller);
    });
  };

  /**
   * @param {object} routes
   * @param {object} controller
   */
  const register = (routes, controllers) => {
    Object.keys(routes).forEach((route) => {
      const controllerName = route.replace('Routes', 'Controller');
      const controller = controllers[controllerName];
      registerRoutesJson(routes[route], controller);
    });
  };

  return {
    registerRoute,
    registerRouteMethods,
    registerRoutesJson,
    register
  };
};
