const ExpressRoutesRegistrar = require('./lib/expressRoutesRegistrar');

module.exports = {
  create: app => new ExpressRoutesRegistrar(app)
};
