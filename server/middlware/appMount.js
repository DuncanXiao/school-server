import mount from 'koa-mount';

const appMount = (server) => {
  return async (ctx, next) => {
    const { api } = ctx.apps;
    server.use(mount(api.mount, api.app));

    await next();
  };
};

export default appMount;