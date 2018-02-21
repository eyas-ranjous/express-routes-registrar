'use strict';

const chai                     = require('chai');
const expect                   = chai.expect;
const chaiHttp                 = require('chai-http');
const express                  = require('express');
const http                     = require('http');
const routes                   = require('./routes');
const controllers              = require('./controllers');
const ExpressRoutesRegistrar   = require('../lib/expressRoutesRegistrar');

chai.use(chaiHttp);

describe('expressRoutesRegistrar tests', () => {
  
  const PORT = 3000;
  const URL = `http://localhost:${PORT}`;

  let app = express();
  let server = http.createServer(app);
  let expressRoutesRegistrar = new ExpressRoutesRegistrar(app);

  before((done) => {
    server.listen(PORT, () => {
      done();
    });
  });

  after((done) => {
    server.close(() => {
      done();
    });
  });

  describe('.registerRoute(route, method, handler)', () => {
    it('should register a single route method and handler', () => {
      expressRoutesRegistrar.registerRoute('/', 'GET', (req, res) => {
        return res.end('/ GET');
      });
      return chai.request(URL).get('/').then((res) => {
        expect(res.text).to.equal('/ GET');
      }); 
    });
  });

  describe('.registerRouteMethods(route, methods, controller)', () => {
    it('should register all methods of a route', () => {
      expressRoutesRegistrar.registerRouteMethods(
        '/users', 
        routes.usersRoutes['/users'], 
        controllers.usersController
      ); 
      return chai.request(URL).get('/users').then((res) => {
          expect(res.text).to.equal('/users GET');
          return chai.request(URL).post('/users');
        })
        .then((res) => {
          expect(res.text).to.equal('/users POST');
        });
    });

    it('should throw an error when handler does not exist in the controller', () => {
      expect(() => expressRoutesRegistrar.registerRouteMethods(
        '/users', 
        { GET: 'getAllContent' }, 
        controllers.usersController)).to
        .throw('missing "getAllContent" in UsersController');
    });
  });

  describe('.registerRoutesJson(routesJson, controller)', () => {
    it('should register routes json file', () => {
      expressRoutesRegistrar.registerRoutesJson(routes.usersRoutes, controllers.usersController);
      return chai.request(URL).get('/users/123').then((res) => {
          expect(res.text).to.equal('/users/:id GET');
          return chai.request(URL).put('/users/123');
        })
        .then((res) => {
          expect(res.text).to.equal('/users/:id PUT');
          return chai.request(URL).delete('/users/123');
        })
        .then((res) => {
          expect(res.text).to.equal('/users/:id DELETE');
        });
    });
  });

  describe('.register(route, method, handler)', () => {
    it('should register routes module', () => {
      expressRoutesRegistrar.register(routes, controllers);
      return chai.request(URL).get('/users/123')
        .then((res) => {
          expect(res.text).to.equal('/users/:id GET');
          return chai.request(URL).get('/');
        })
        .then((res) => {
          expect(res.text).to.equal('/ GET');
        });
    });
  });

});