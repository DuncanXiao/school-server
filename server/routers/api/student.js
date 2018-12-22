import Router from 'koa-router';
import validate from 'koa2-validation';
import studentSchema from '../../lib/schema/studentSchema';
import StundentController from '../../controllers/api/student';

const studentApi = new Router();

studentApi.get('/student/:id', validate(studentSchema.get), async(ctx) => {
	const stundentController = new StundentController();
	try {
		const data = await stundentController.get(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		stundentController.handlerError(ctx, error);
	}
});

studentApi.put('/student/:id', validate(studentSchema.put), async(ctx) => {
	const stundentController = new StundentController();
	try {
		const data = await stundentController.put(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		stundentController.handlerError(ctx, error);
	}
});

export default studentApi;