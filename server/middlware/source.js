import { getAppPath } from '../utilities/getFiles';
import * as _ from 'lodash';

const apps = {};

const getApp = () => {
  const apps = {};
  const appPaths = getAppPath();
  appPaths.map((appPath) => {
    const App = require(appPath);
    const app = new App();
    app.start();
    apps[app.appName] = app;
  });
  return apps;
};

getApp();

const source = async (ctx, next) => {
  _.isEmpty(apps) ? ctx.apps = getApp() : ctx.apps = apps;

  await next();
};

export default source;