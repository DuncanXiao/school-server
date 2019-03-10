import Koa from 'koa';
// import jwt from 'koa-jwt';
import BaseApp from '../baseApp';
import requireDir from 'require-dir';

require('dotenvjs').string();

class ApiApp extends BaseApp {
  constructor() {
    super();

    this.app = new Koa();
    this.mount = '/api';
    this.appName = 'api';
    this.controllers = {};
  }

  start = () => {
    // this.app.use(jwt({ secret: process.env.SECREAT }).unless({ path: [/^\/api\/login/, /^\/api\/signup/] }));
    this.initControllers(requireDir('./controllers'));
    this.initRouters(requireDir('./routers'));
  }
}

module.exports = ApiApp;