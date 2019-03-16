import Koa from 'koa';
// import jwt from 'koa-jwt';
import BaseApp from '../baseApp';

require('dotenvjs').string();

class AuthApp extends BaseApp {
  constructor(options) {
    super(options);

    this.app = new Koa();
    this.mount = '/auth';
    this.name = 'auth';
    this.controllers = {};
  }
}

module.exports = AuthApp;