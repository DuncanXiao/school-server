import Router from 'koa-router';
import validate from 'koa2-validation';
import schoolStoreProductSchema from '../../lib/schema/schoolStoreProductSchema';
import SchoolStoreProductController from '../../controllers/api/schoolStoreProduct';

const schoolStoreProductApi = new Router();

schoolStoreProductApi.get('/school-stores/:storeId/products', validate(schoolStoreProductSchema.list.get), async(ctx) => {
  const controller = new SchoolStoreProductController();
  try {
    const data = await controller.getList({storeId: ctx.params.storeId});
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

schoolStoreProductApi.post('/school-stores/:storeId/products', validate(schoolStoreProductSchema.list.post), async(ctx) => {
  const controller = new SchoolStoreProductController();
  try {
    const requestBody = controller.getStoreIdRequest(ctx.request.body, {storeId: ctx.params.storeId});
    const data = await controller.model.bulkInsertToSql(requestBody);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

export default schoolStoreProductApi;