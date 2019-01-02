import Router from 'koa-router';
import validate from 'koa2-validation';
import schoolStoreSchema from '../../lib/schema/schoolStoreSchema';
import SchoolStoreController from '../../controllers/api/schoolStore';

const schoolStoreApi = new Router();

schoolStoreApi.get('/school-stores/:schoolId/stores/:id', validate(schoolStoreSchema.schoolStoreItem.get), async(ctx) => {
  const controller = new SchoolStoreController();
  try {
    const data = await controller.getItemById(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

schoolStoreApi.put('/school-stores/:schoolId/stores/:id', validate(schoolStoreSchema.schoolStoreItem.put), async(ctx) => {
  const controller = new SchoolStoreController();
  try {
    const data = await controller.putItemById(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

schoolStoreApi.post('/school-stores/:schoolId/stores', validate(schoolStoreSchema.schoolStoreItem.post), async(ctx) => {
  const controller = new SchoolStoreController();
  try {
    const data = await controller.insertItem(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});


schoolStoreApi.get('/school-stores/:schoolId/stores', validate(schoolStoreSchema.schoolStoreList.get), async(ctx) => {
  const controller = new SchoolStoreController();
  try {
    const data = await controller.getList(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

export default schoolStoreApi;