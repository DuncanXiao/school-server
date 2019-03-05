import Router from 'koa-router';
import validate from 'koa2-validation';
import schoolStoreRegistrySchema from '../../lib/schema/schoolStoreRegistry';

const signupSchoolStoreApi = new Router();

signupSchoolStoreApi.post('/school-stores/login', validate(schoolStoreRegistrySchema.login), async(ctx) => {
	const { schoolStoreRegistry } = ctx.apps.api.controllers;
  try {
    const data = await schoolStoreRegistry.login(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    schoolStoreRegistry.handlerError(ctx, error);
	}
});

export default signupSchoolStoreApi;