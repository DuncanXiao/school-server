import Router from 'koa-router';
import validate from 'koa2-validation';
import signupSchema from 'Model/schema/signupSchema';
import SingupController from 'Controllers/api/signup';

const signupApi = new Router();

signupApi.post('/signup', validate(signupSchema), async(ctx) => {
	const singupController = new SingupController();
	try {
		const data = singupController.insertEmail(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		singupController.handlerError(ctx, error);
	}
});

export default signupApi;