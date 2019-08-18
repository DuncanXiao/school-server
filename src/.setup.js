require('babel-polyfill');
require('babel-register')();

const chai = require('chai');
const request = require('supertest');
global.expect = chai.expect;
global.request = request;