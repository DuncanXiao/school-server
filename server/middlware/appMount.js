import mount from 'koa-mount';
import lodash from 'lodash';

const appMount = (server) => {
  return async (ctx, next) => {
    lodash.forEach(ctx.apps, (a) => server.use(mount(a.mount, a.app)));

    await next();
  };
};

export default appMount;