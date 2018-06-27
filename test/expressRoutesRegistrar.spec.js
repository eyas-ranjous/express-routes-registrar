const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const http = require('http');
const routes = require('./routes');
const controllers = require('./controllers');
const expressRoutesRegistrar = require('../lib/expressRoutesRegistrar');

const { expect } = chai;

chai.use(chaiHttp);

describe('expressRoutesRegistrar tests', () => {
  const PORT = 3000;
  const URL = `http://localhost:${PORT}`;
  const app = express();
  const server = http.createServer(app);
  const registrar = expressRoutesRegistrar(app);

  before(done => server.listen(PORT, () => done()));
  after(done => server.close(() => done()));

  describe('.registerRoute(route, method, handler)', () => {
    it('should register a single route method and handler', () => {
      registrar.registerRoute(
        '/',
        'GET',
        (req, res) => res.end('/ GET')
      );
      return chai.request(URL).get('/')
        .then(res => expect(res.text).to.equal('/ GET'));
    });
  });

  describe('.registerRouteMethods(route, methods, controller)', () => {
    it('should register all methods of a route', () => {
      registrar.registerRouteMethods(
        '/users',
        routes.usersRoutes['/users'],
        controllers.usersController
      );
      return chai.request(URL).get('/users')
        .then((res) => {
          expect(res.text).to.equal('/users GET');
          return chai.request(URL).post('/users');
        })
        .then(res => expect(res.text).to.equal('/users POST'));
    });

    it('should throw an error when handler not exist in controller', () => {
      expect(() => registrar.registerRouteMethods(
        '/users',
        { GET: 'getAllContent' },
        controllers.usersController
      )).to.throw('missing "getAllContent" handler in UsersController');
    });
  });

  describe('.registerRoutesJson(routesJson, controller)', () => {
    it('should register routes json file', () => {
      registrar.registerRoutesJson(
        routes.usersRoutes,
        controllers.usersController
      );
      return chai.request(URL).get('/users/123')
        .then((res) => {
          expect(res.text).to.equal('/users/:id GET');
          return chai.request(URL).put('/users/123');
        })
        .then((res) => {
          expect(res.text).to.equal('/users/:id PUT');
          return chai.request(URL).delete('/users/123');
        })
        .then(res => expect(res.text).to.equal('/users/:id DELETE'));
    });
  });

  describe('.register(route, method, handler)', () => {
    it('should register routes module', () => {
      registrar.register(routes, controllers);
      return chai.request(URL).get('/users/123')
        .then((res) => {
          expect(res.text).to.equal('/users/:id GET');
          return chai.request(URL).get('/');
        })
        .then(res => expect(res.text).to.equal('/ GET'));
    });
  });
});
