import Router from 'koa-router';
import validate from 'koa2-validation';
import studentOrderSchema from '../../lib/schema/studentOrder';

const studentOrderApi = new Router();

studentOrderApi.get('/students-orders/:uuid/orders', validate(studentOrderSchema.get), async(ctx) => {
	const { studentOrder } = ctx.apps.api.controllers;
	try {
		const data = await studentOrder.index(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		studentOrder.handlerError(ctx, error);
	}
});

studentOrderApi.post('/students-orders/:uuid/orders', validate(studentOrderSchema.put), async(ctx) => {
	const { studentOrder } = ctx.apps.api.controllers;
	try {
		const data = await studentOrder.create(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		studentOrder.handlerError(ctx, error);
	}
});

studentOrderApi.put('/students-orders/:uuid/orders/:orderNumber', validate(studentOrderSchema.put), async(ctx) => {
	const { studentOrder } = ctx.apps.api.controllers;
	try {
		const data = await studentOrder.update(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		studentOrder.handlerError(ctx, error);
	}
});

export default studentOrderApi;