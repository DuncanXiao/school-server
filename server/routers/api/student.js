import Router from 'koa-router';
import validate from 'koa2-validation';
import studentSchema from '../../lib/schema/student';
import StundentController from '../../controllers/api/student';

const studentApi = new Router();

studentApi.get('/student/:uuid', validate(studentSchema.get), async(ctx) => {
	const stundentController = new StundentController();
	try {
		const data = await stundentController.getItem({uuid: ctx.params.uuid});
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		stundentController.handlerError(ctx, error);
	}
});

studentApi.put('/student/:uuid', validate(studentSchema.put), async(ctx) => {
	const stundentController = new StundentController();
	try {
		const data = await stundentController.putItemByUuId(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		stundentController.handlerError(ctx, error);
	}
});

export default studentApi;