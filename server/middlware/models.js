
const modelsMiddlware = (models) => {
  return async (ctx, next) => {
		ctx.$models = models;

		await next();
  };
};

export default modelsMiddlware;