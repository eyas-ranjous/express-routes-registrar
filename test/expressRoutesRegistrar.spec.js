'use strict';

const chai                     = require('chai'),
      expect                   = chai.expect,
      chaiHttp                 = require('chai-http'),
      express                  = require('express'),
      http                     = require('http'),
      routes                   = require('./routes'),
      controllers              = require('./controllers'),
      ExpressRoutesRegistrar   = require('../lib/expressRoutesRegistrar');

chai.use(chaiHttp);

describe('expressRoutesRegistrar tests', () => {

    let app = express(),
        server = http.createServer(app),
        port = 3000,
        url = `http://localhost:${port}`,
        expressRoutesRegistrar = new ExpressRoutesRegistrar(app);

    before((done) => {
        server.listen(port, (err) => {
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
        
            return chai.request(url).get('/')
                .then((res) => {
                    expect(res.text).to.equal('/ GET');
                });     
        });
    });

    describe('.registerRouteMethods(route, methods, controller)', () => {
        it('should register all methods of a route', () => {
            expressRoutesRegistrar.registerRouteMethods('/users', 
                routes.usersRoutes['/users'], controllers.usersController);
            
            return chai.request(url).get('/users')
                .then((res) => {
                    expect(res.text).to.equal('/users GET');
                    return chai.request(url).post('/users');
                })
                .then((res) => {
                    expect(res.text).to.equal('/users POST');
                });
        });

        it('should throw an error when handler does not exist in the controller', () => {
            expect(() => expressRoutesRegistrar.registerRouteMethods('/users', 
                {GET: 'getAllContent'}, controllers.usersController))
                .to.throw('handler "getAllContent" not found in /users controller');
        });
    });

    describe('.registerRoutesJson(routesJson, controller)', () => {
        it('should register routes json file', () => {
            expressRoutesRegistrar.registerRoutesJson(routes.usersRoutes, controllers.usersController);
            
            return chai.request(url).get('/users/123')
                .then((res) => {
                    expect(res.text).to.equal('/users/:id GET');
                    return chai.request(url).put('/users/123');
                })
                .then((res) => {
                    expect(res.text).to.equal('/users/:id PUT');
                    return chai.request(url).delete('/users/123');
                })
                .then((res) => {
                    expect(res.text).to.equal('/users/:id DELETE');
                });
        });
    });

    describe('.register(route, method, handler)', () => {
        it('should register routes module', () => {
            expressRoutesRegistrar.register(routes, controllers);

            return chai.request(url).get('/users/123')
                .then((res) => {
                    expect(res.text).to.equal('/users/:id GET');
                    return chai.request(url).get('/');
                })
                .then((res) => {
                    expect(res.text).to.equal('/ GET');
                });
        });
    });

});