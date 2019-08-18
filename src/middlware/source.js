// import lodash from 'lodash';

const source = (apps) => {
  return async (ctx, next) => {
    ctx.apps = apps;

    await next();
  };
};

export default source;