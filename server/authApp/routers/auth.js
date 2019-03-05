import Router from 'koa-router';
import validate from 'koa2-validation';
import authSchema from '../../lib/schema/auth';
import {signToken} from '../../utilities/createJwt';

const authRouter = new Router();

authRouter.post('/student/login', validate(authSchema.loginStudent), async(ctx) => {
	const { auth } = ctx.apps.auth.controllers;
	try {
		const data = await auth.loginStudent(ctx);
		ctx.set('Authorization', signToken({uuid: data.get('uuid')}));
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		auth.handlerError(ctx, error);
	}
});

authRouter.post('/student/signup', validate(authSchema.signupStudent), async(ctx) => {
	const { auth } = ctx.apps.api.controllers;
	try {
		const data = await auth.signupStudent(ctx);
		ctx.set('Authorization', signToken({uuid: data.uuid}));
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		auth.handlerError(ctx, error);
	}
});

authRouter.post('/school-stores/login', validate(authSchema.loginSchoolStore), async(ctx) => {
	const { auth } = ctx.apps.api.controllers;
  try {
    const data = await auth.loginSchoolStores(ctx);
		ctx.set('Authorization', signToken({uuid: data.get('uuid')}));
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    auth.handlerError(ctx, error);
	}
});


authRouter.post('/school-stores/signup', validate(authSchema.signupSchoolStore), async(ctx) => {
	const { auth } = ctx.apps.api.controllers;
  try {
    const data = await auth.signupSchoolStores(ctx);
		ctx.set('Authorization', signToken({uuid: data.uuid}));
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    auth.handlerError(ctx, error);
	}
});

export default authRouter;