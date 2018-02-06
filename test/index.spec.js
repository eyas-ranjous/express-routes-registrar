'use strict';

const expect                   = require('chai').expect,
      express                  = require('express'),
      index                    = require('../index'),
      ExpressRoutesRegistrar   = require('../lib/expressRoutesRegistrar');

describe('index tests', () => {

    describe('.create(app)', () => {
        it('should create an instance of ExpressRoutesRegistrar', () => {
            expect(index.create(express())).to.be.instanceof(ExpressRoutesRegistrar);
        });
    });

});
