import lodash from 'lodash';
import requireDir from 'require-dir';

export default class BaseApp {
  constructor(options) {
    this.server = options.server;
  }

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

  beforeStart = () => {}

  start = () => {
    const { name } = this.constructor;
    const folderName = name.charAt(0).toLowerCase() + name.substring(1);
    this.initControllers(requireDir(`./${folderName}/controllers`));
    this.initRouters(requireDir(`./${folderName}/routers`));
  }

  afterStart = () => {}
}