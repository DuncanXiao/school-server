import Router from 'koa-router';
import validate from 'koa2-validation';
import studentSchema from '../../lib/schema/studentSchema';
import StundentController from '../../controllers/api/student';

const studentApi = new Router();

studentApi.get('/student/:id', validate(studentSchema.get), async(ctx) => {
	const stundentController = new StundentController();
	try {
		const data = await stundentController.getItemById(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		stundentController.handlerError(ctx, error);
	}
});

studentApi.put('/student/:id', validate(studentSchema.put), async(ctx) => {
	const stundentController = new StundentController();
	try {
		const data = await stundentController.putItemById(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		stundentController.handlerError(ctx, error);
	}
});

export default studentApi;