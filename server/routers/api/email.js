import Router from 'koa-router';
// import EmailController from 'Controllers/api/email';
// import _ from 'underscore';
const emailApi = new Router();

emailApi.get('/email/:email', async() => {
	// const request = Object.assign({}, ctx.params, ctx.request.query);
	// try {
	// 	const existedEmail = await EmailController.getEmail(request).catch((e) => {
	// 		throw e;
	// 	});
	// 	if (existedEmail === null) {
	// 		throw {'statusCode': 400, 'message': 'error request, email does not exist!'};
	// 	}
	// 	if (existedEmail.get('code') !== request.code) {
	// 		throw {'statusCode': 400, 'message': 'error code.'};
	// 	}
	// 	const userParams = _.omit(request, 'code');
	// 	const emailParams = {state: 1, email: request.email};
	// 	await EmailController.updateEmailandCreateUser({userParams, emailParams}).then(v => {
	// 		ctx.body = v.message;
	// 	}).catch((err) => {throw err;});
	// } catch(err) {
	// 	ctx.status = err.statusCode || 500;
	// 	ctx.body = err.message;
	// }
});

export default emailApi;