import requireDir from 'require-dir';
import lodash from 'lodash';

export default class BaseApp {

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