
const modelsMiddlware = (models) => {
  return async (ctx, next) => {
		ctx.$db = models;

		await next();
  };
};

export default modelsMiddlware;