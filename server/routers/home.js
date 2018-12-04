import Router from 'koa-router';
import HomeController from 'Controllers/home';

const home = new Router();

home.get('/', async(ctx) => {
	const homeController = new HomeController();
	// eslint-disable-next-line no-console
	console.log(ctx.cookies.get('token'));
	await ctx.render(homeController.template, homeController.templateOptions);
});

export default home;