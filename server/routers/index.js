import Router from 'koa-router';
import path from 'path';
import { getFilesPath } from '../utilities/getFiles';

const router = new Router();

const rootPath = path.resolve(__dirname, '../../server/routers');
const ignoreFilesName = ['index.js'];
const routerPaths = getFilesPath({rootPath, ignoreFilesName});

const initRouter = () => {
	routerPaths.forEach((routerPath) => {
		let routerName = require(`.${routerPath}`).default;
		if (/^(\/home)/.test(routerPath)) {
			router.use('/', routerName.routes(), routerName.allowedMethods());
		} else if (/^(\/api)/.test(routerPath)) {
			router.use('/api', routerName.routes(), routerName.allowedMethods());
		} else {
			router.use(routerPath, routerName.routes(), routerName.allowedMethods());
		}
	});
};

initRouter();

export default router;