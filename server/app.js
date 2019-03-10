import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import http from 'http';
import appMount from './middlware/appMount';
import catchError from './middlware/catchError';
import source from './middlware/source';
import models from './middlware/models';

process.on('unhandledRejection', (reason, p) => {
  // eslint-disable-next-line no-console
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

const app = new Koa();

app.use(catchError);

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

app.use(source);

app.use(appMount(app));

app.use(models);

const server = http.createServer(app.callback());
server.listen(3000, function(){
	// eslint-disable-next-line no-console
	console.log('part: 3000');
});

export default server;