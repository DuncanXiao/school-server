import Koa from 'koa';
// import jwt from 'koa-jwt';
import requireDir from 'require-dir';
import lodash from 'lodash';

require('dotenvjs').string();

class ApiApp {
  constructor() {
    this.app = new Koa();
    this.mount = '/api';
    this.appName = 'api';
    this.controllers = {};
  }

  start = () => {
    // this.app.use(jwt({ secret: process.env.SECREAT }).unless({ path: [/^\/api\/login/, /^\/api\/signup/] }));
    this.initControllers();
    this.initRouters();
  }

  initControllers = () => {
    const Controllers = requireDir('./controllers');
    lodash.forEach(Controllers, (C, key) => {
      this.controllers[key] = new C.default();
    });
  }

  initRouters = () => {
    const routers = requireDir('./routers');
    lodash.forEach(routers, (router) => {
      this.app.use(router.default.routes()).use(router.default.allowedMethods());
    });
  }
}

module.exports = ApiApp;