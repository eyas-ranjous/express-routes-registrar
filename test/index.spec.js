const { expect } = require('chai');
const express = require('express');
const index = require('../index');
const ExpressRoutesRegistrar = require('../lib/expressRoutesRegistrar');

describe('index tests', () => {
  describe('.create(app)', () => {
    it('should create an instance of ExpressRoutesRegistrar', () => {
      expect(index.create(express())).to.be.instanceof(ExpressRoutesRegistrar);
    });
  });
});
