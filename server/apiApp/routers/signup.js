import Router from 'koa-router';
import validate from 'koa2-validation';
import signupSchema from '../../lib/schema/signup';

const signupApi = new Router();

signupApi.post('/signup', validate(signupSchema), async(ctx) => {
	const { signup } = ctx.apps.api.controllers;
	try {
		const data = await signup.insertStudent(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		signup.handlerError(ctx, error);
	}
});

export default signupApi;