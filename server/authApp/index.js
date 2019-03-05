import Koa from 'koa';
// import jwt from 'koa-jwt';
import BaseApp from '../baseApp';

require('dotenvjs').string();

class authApp extends BaseApp {
  constructor() {
    super();

    this.app = new Koa();
    this.mount = '/auth';
    this.appName = 'auth';
    this.controllers = {};
  }

  start = () => {
    // this.app.use(jwt({ secret: process.env.SECREAT }).unless({ path: [/^\/api\/login/, /^\/api\/signup/] }));
    this.initControllers();
    this.initRouters();
  }
}

module.exports = authApp;