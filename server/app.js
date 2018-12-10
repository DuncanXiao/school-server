import Koa from 'koa';
import router from './routers/index';
import views from 'koa-views';
import path from 'path';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import http from 'http';

process.on('unhandledRejection', (reason, p) => {
  // eslint-disable-next-line no-console
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

const app = new Koa();

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || err.code;
		ctx.body = {
			success: false,
			message: err.message,
		};
	}
});

app.use(bodyParser());

app.use(serve(
	path.join( __dirname, './static')
));

app.use(views(path.join(__dirname, './views'), {
	extension: 'ejs',
	map: {
		ejs: 'ejs'
	}
}));

app.use(router.routes()).use(router.allowedMethods());
const server = http.createServer(app.callback());
server.listen(3000, function(){
	// eslint-disable-next-line no-console
	console.log('part: 3000');
});

export default server;