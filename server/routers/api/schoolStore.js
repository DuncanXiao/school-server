import Router from 'koa-router';
import validate from 'koa2-validation';
import schoolStoreSchema from '../../lib/schema/schoolStoreSchema';
import SchoolStoreController from '../../controllers/api/schoolStore';

const schoolStoreApi = new Router();

schoolStoreApi.get('/school-stores/:schoolId/stores/:id', validate(schoolStoreSchema.item.get), async(ctx) => {
  const controller = new SchoolStoreController();
  try {
    const data = await controller.getItem({id: ctx.params.id});
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

schoolStoreApi.put('/school-stores/:schoolId/stores/:id', validate(schoolStoreSchema.item.put), async(ctx) => {
  const controller = new SchoolStoreController();
  try {
    const data = await controller.putItemById(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

schoolStoreApi.post('/school-stores/:schoolId/stores', validate(schoolStoreSchema.item.post), async(ctx) => {
  const controller = new SchoolStoreController();
  try {
    const data = await controller.insertItem(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});


schoolStoreApi.get('/school-stores/:schoolId/stores', validate(schoolStoreSchema.list.get), async(ctx) => {
  const controller = new SchoolStoreController();
  try {
    const data = await controller.getList({schoolId: ctx.params.schoolId});
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

export default schoolStoreApi;