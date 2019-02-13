import Router from 'koa-router';
import validate from 'koa2-validation';
import schoolStoreRegistrySchema from '../../lib/schema/schoolStoreRegistry';
import SchoolStoreRegistryController from '../../controllers/api/schoolStoreRegistry';

const signupSchoolStoreApi = new Router();

signupSchoolStoreApi.post('/school-stores/login', validate(schoolStoreRegistrySchema.login), async(ctx) => {
  const controller = new SchoolStoreRegistryController();
  try {
    const data = await controller.login(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
    controller.handlerError(ctx, error);
	}
});

export default signupSchoolStoreApi;