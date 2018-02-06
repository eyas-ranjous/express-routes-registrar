'use strict';

const ExpressRoutesRegistrar = require('./lib/expressRoutesRegistrar');

module.exports = {
    /**
     * @public
     * register all methods and handlers of a route 
     * @param {object} expressApp
     * @returns {ExpressRoutesRegistrar}
     */
    create: (expressApp) => {
        return new ExpressRoutesRegistrar(expressApp);
    }
};