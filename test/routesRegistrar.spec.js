var expect = require('chai').expect,
    app = require('express')(),
    http = require('http'),
    request = require('supertest'),
    routes = require('./routes'), // routes module
    controllers = require('./controllers'), // controllers module
    registrar = require('../lib/routesRegistrar')(app);


describe('routes registrar test', function() {

    var server = http.createServer(app),
        host = 'localhost',
        port = 3000,
        url = 'http://' + host + ':' + port;

    // run once before all the test cases
    before(function(done) {
        request = request.bind(request, url).call(request, app);
        // start a server to accept http requests
        server.listen(port, host, function(err){
            done();
        });
    });


    it('should register a route in an app instance', function(done) {
        var response = 'registerRoute response';

        registrar.registerRoute('/', 'GET', function(req, res) {
            res.end(response);
        });

        request.get('/').expect(200, response).end(done);
    });

    describe('test regisstering all methods handlers within a route' , function() {

        var route = '/tests',
            routeMethods =  routes.testsRoutes[route],
            controller = controllers.testsController;

        before(function() {
            registrar.registerRouteMethods(route, routeMethods, controller);
        });

        it('should receive a 200 reponse when getting /tests', function(done) {
            request.get('/tests').expect(200, 'testsController getAll').end(done);
        });

        it('should receive a 200 reponse when posting to /tests', function(done) {
            request.post('/tests').expect(200, 'testsController add').end(done);
        });
    });


    describe('test registering a routes json file in an app' , function() {

        var routesJson = routes.testsRoutes,
            controller = controllers.testsController;

        before(function() {
            registrar.registerRoutesJson(routesJson, controller);
        });

        it('should receive a 200 reponse when getting /tests/:t', function(done) {
            request.get('/tests/10').expect(200, 'testsController get').end(done);
        });

        it('should receive a 200 reponse when updating /tests/:t', function(done) {
            request.put('/tests/10').expect(200, 'testsController update').end(done);
        });

        it('should receive a 200 reponse when deleting /tests/:t', function(done) {
            request.delete('/tests/10').expect(200, 'testsController remove').end(done);
        });
    });

    describe('test registering a routes module in an app' , function() {

        before(function() {
            registrar.register(routes, controllers);
        });

        it('should receive a 200 reponse when getting /about', function(done) {
            request.get('/about').expect(200, 'homeController about').end(done);
        });

        it('should receive a 200 reponse when getting /users', function(done) {
            request.get('/users').expect(200, 'usersController index').end(done);
        });

        it('should receive a 200 reponse when getting /users/:id', function(done) {
            request.get('/users/1111').expect(200, 'usersController get').end(done);
        });

    });

    after(function(done) {
        server.close(function(){
            done();
        });
    });
});