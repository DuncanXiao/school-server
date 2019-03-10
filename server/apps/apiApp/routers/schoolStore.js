import Router from 'koa-router';
import validate from 'koa2-validation';
import schoolStoreSchema from '../schema/schoolStore';

const schoolStoreApi = new Router();

schoolStoreApi.get('/school-stores/:schoolId/stores/:uuid', validate(schoolStoreSchema.item.get), async(ctx) => {
	const { schoolStore } = ctx.apps.api.controllers;
  try {
    const data = await schoolStore.show({uuid: ctx.params.uuid});
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    schoolStore.handlerError(ctx, error);
	}
});

schoolStoreApi.put('/school-stores/:schoolId/stores/:uuid', validate(schoolStoreSchema.item.put), async(ctx) => {
	const { schoolStore } = ctx.apps.api.controllers;
  try {
    const data = await schoolStore.update(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    schoolStore.handlerError(ctx, error);
	}
});

schoolStoreApi.post('/school-stores/:schoolId/stores', validate(schoolStoreSchema.item.post), async(ctx) => {
	const { schoolStore } = ctx.apps.api.controllers;
  try {
    const data = await schoolStore.create(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    schoolStore.handlerError(ctx, error);
	}
});


schoolStoreApi.get('/school-stores/:schoolId/stores', validate(schoolStoreSchema.list.get), async(ctx) => {
  const { schoolStore } = ctx.apps.api.controllers;
  try {
    const data = await schoolStore.index();
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    schoolStore.handlerError(ctx, error);
	}
});

export default schoolStoreApi;