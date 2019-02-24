import Router from 'koa-router';
import validate from 'koa2-validation';
import studentOrderSchema from '../../lib/schema/studentOrder';
import StundentOrderController from '../../controllers/api/studentOrder';

const studentOrderApi = new Router();

studentOrderApi.get('/students-orders/:uuid/orders', validate(studentOrderSchema.get), async(ctx) => {
	const controller = new StundentOrderController();
	try {
		const data = await controller.getList({ uuid: ctx.params.uuid });
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		controller.handlerError(ctx, error);
	}
});

studentOrderApi.post('/students-orders/:uuid/orders', validate(studentOrderSchema.put), async(ctx) => {
	const controller = new StundentOrderController();
	try {
		const data = await controller.createOne(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		controller.handlerError(ctx, error);
	}
});

studentOrderApi.put('/students-orders/:uuid/orders/:orderNumber', validate(studentOrderSchema.put), async(ctx) => {
	const controller = new StundentOrderController();
	try {
		const data = await controller.insertList(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		controller.handlerError(ctx, error);
	}
});

export default studentOrderApi;