import Koa from 'koa';
// import views from 'koa-views';
// import path from 'path';
// import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import http from 'http';
import catchError from './middlware/catchError';
import source from './middlware/source';
import modelsMiddlware from './middlware/models';
import { getAppPath } from './utilities/getFiles';
import db from '../models';
import mount from 'koa-mount';
import lodash from 'lodash';

class Server {
	constructor() {
		this.$db = db;
		this.controllers = {};
		this.apps = {};
		this.server = new Koa();
	}

	initMiddle = () => {
		const { server } = this;
		server.use(catchError);
		server.use(bodyParser());
		// server.use(serve(
		// 	path.join( __dirname, './static')
		// ));
		// server.use(views(path.join(__dirname, './views'), {
		// 	extension: 'ejs',
		// 	map: {
		// 		ejs: 'ejs'
		// 	}
		// }));
	}

	initApps = () => {
		const { apps } = this;
		const appPaths = getAppPath();

		if (lodash.isEmpty(appPaths)) throw new Error('not found app path.');
		appPaths.map((appPath) => {
			const App = require(appPath);
			const app = new App(this);
			app.beforeStart();
			app.start();
			apps[app.name] = app;
		});
	}

	addServerMiddle = () => {
		const { server } = this;
		server.use(source(this.apps));
		server.use(modelsMiddlware(this.$db));
	}

	start = () => {
		this.initMiddle();
		this.initApps();
		this.addServerMiddle();

    lodash.forEach(this.apps, (app) => {
			this.server.use(mount(app.mount, app.app));
    });

		http.createServer(this.server.callback()).listen(3000, function(){
			// eslint-disable-next-line no-console
			console.log('part: 3000');
		});
	}
}

const server = new Server ();
server.start();

export default server;