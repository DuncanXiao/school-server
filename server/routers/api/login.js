import Router from 'koa-router';
import validate from 'koa2-validation';
import loginSchema from 'Model/schema/loginSchema';
import LoginController from 'Controllers/api/login';

const loginApi = new Router();

loginApi.post('/login', validate(loginSchema), async(ctx) => {
	const loginController = new LoginController();
	try {
		const data = await loginController.validateEmail(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch (error) {
		loginController.handlerError(ctx, error);
	}
});

export default loginApi;
