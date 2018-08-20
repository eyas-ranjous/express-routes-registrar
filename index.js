/**
 * express-routes-registrar
 * @copyright 2018 Eyas Ranjous <https://github.com/eyas-ranjous>
 * @license MIT
 */

module.exports = (app) => {
  const registerRoute = (route, method, handler) =>
    app[method.toLowerCase()](route, handler);

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

  const registerRoutesJson = (routesJson, controller) => {
    Object.keys(routesJson).forEach((route) => {
      registerRouteMethods(route, routesJson[route], controller);
    });
  };

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
