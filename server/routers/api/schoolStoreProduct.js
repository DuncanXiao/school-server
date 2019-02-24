import Router from 'koa-router';
import validate from 'koa2-validation';
import schoolStoreProductSchema from '../../lib/schema/schoolStoreProduct';
import SchoolStoreProductController from '../../controllers/api/schoolStoreProduct';

const schoolStoreProductApi = new Router();

schoolStoreProductApi.get('/school-stores/:uuid/products', validate(schoolStoreProductSchema.list.get), async(ctx) => {
  const controller = new SchoolStoreProductController();
  try {
    const data = await controller.findProducts({storeId: ctx.params.storeId});
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

schoolStoreProductApi.post('/school-stores/:uuid/products', validate(schoolStoreProductSchema.list.post), async(ctx) => {
  const controller = new SchoolStoreProductController();
  try {
    const requestBody = controller.getStoreIdRequest(ctx.request.body, ctx.params.uuid);
    const data = await controller.model.bulkInsertToSql(requestBody);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

export default schoolStoreProductApi;