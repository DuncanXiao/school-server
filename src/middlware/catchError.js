const catchError = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
		ctx.status = err.status || err.code || 500;
		ctx.body = {
			success: false,
			message: err.message,
		};
	}
};

export default catchError;