import Router from 'koa-router';
import validate from 'koa2-validation';
import loginSchema from '../../lib/schema/login';
import {signToken} from '../../utilities/createJwt';

const loginApi = new Router();

loginApi.post('/login', validate(loginSchema), async(ctx) => {
	const { login } = ctx.apps.api.controllers;
	try {
		const data = await login.login(ctx);
		ctx.status = 200;
		ctx.set('Authorization', signToken({studentId: data.get('id')}));
		ctx.body = data;
	} catch(error) {
		login.handlerError(ctx, error);
	}
});

export default loginApi;