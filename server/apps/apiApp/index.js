import Koa from 'koa';
// import jwt from 'koa-jwt';
import BaseApp from '../baseApp';

require('dotenvjs').string();

class ApiApp extends BaseApp {
  constructor(options) {
    super(options);

    this.app = new Koa();
    this.mount = '/api';
    this.name = 'api';
    this.controllers = {};
  }

  beforeStart = () => {
    // this.app.use(jwt({ secret: process.env.SECREAT }).unless({ path: [/^\/api\/login/, /^\/api\/signup/] }));
  }
}

module.exports = ApiApp;