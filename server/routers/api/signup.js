import Router from 'koa-router';
import validate from 'koa2-validation';
import signupSchema from '../../lib/schema/signupSchema';
import SingupController from '../../controllers/api/signup';

const signupApi = new Router();

signupApi.post('/signup', validate(signupSchema), async(ctx) => {
	const singupController = new SingupController();
	try {
		const data = await singupController.insertStudent(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		singupController.handlerError(ctx, error);
	}
});

export default signupApi;