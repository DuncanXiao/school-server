import Router from 'koa-router';
import validate from 'koa2-validation';
import studentSchema from '../../lib/schema/student';

const studentApi = new Router();

studentApi.get('/student/:uuid', validate(studentSchema.get), async(ctx) => {
	const { student } = ctx.apps.api.controllers;
	try {
		const data = await student.show({uuid: ctx.params.uuid});
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		student.handlerError(ctx, error);
	}
});

studentApi.put('/student/:uuid', validate(studentSchema.put), async(ctx) => {
	const { student } = ctx.apps.api.controllers;
	try {
		const data = await student.update(ctx);
		ctx.status = 200;
		ctx.body = data;
	} catch(error) {
		student.handlerError(ctx, error);
	}
});

export default studentApi;