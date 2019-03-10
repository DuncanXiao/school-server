import lodash from 'lodash';

export default class BaseApp {

  initControllers = (Controllers) => {
    lodash.forEach(Controllers, (C, key) => {
      this.controllers[key] = new C.default();
    });
  }

  initRouters = (routers) => {
    lodash.forEach(routers, (router) => {
      this.app.use(router.default.routes()).use(router.default.allowedMethods());
    });
  }
}