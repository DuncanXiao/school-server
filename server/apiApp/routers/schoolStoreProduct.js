import Router from 'koa-router';
import validate from 'koa2-validation';
import schoolStoreProductSchema from '../../lib/schema/schoolStoreProduct';

const schoolStoreProductApi = new Router();

schoolStoreProductApi.get('/school-stores/:uuid/products', validate(schoolStoreProductSchema.list.get), async(ctx) => {
	const { schoolStoreProduct } = ctx.apps.api.controllers;
  try {
    const data = await schoolStoreProduct.index(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    schoolStoreProduct.handlerError(ctx, error);
	}
});

schoolStoreProductApi.post('/school-stores/:uuid/products', validate(schoolStoreProductSchema.list.post), async(ctx) => {
	const { schoolStoreProduct } = ctx.apps.api.controllers;
  try {
		const data = await schoolStoreProduct.create(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    schoolStoreProduct.handlerError(ctx, error);
	}
});

export default schoolStoreProductApi;