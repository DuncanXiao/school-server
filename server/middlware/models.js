import path from 'path';
import sequelize from '../models';
import { getFilesName } from '../utilities/getFiles';
import * as _ from 'lodash';

const models = {};

const inintModel = () => {
	const models = {};
	const sequelizeModels = path.resolve(__dirname, '../models');
	const ignoreFilesName = ['index.js'];
	const modelFilesName = getFilesName({ignoreFilesName, rootPath: sequelizeModels});
	modelFilesName.forEach((fileName) => {
		const model = sequelize.import(`${sequelizeModels}/${fileName}`);
		models[fileName.replace(/.js/, '')] = model;
	});
	_.forEach(models,(model) => {
		if (model.hasOwnProperty('associate')) {
			model.associate(models);
		}
		model.sync();
	});

	return models;
};

inintModel();

const modelsMiddlware = async(ctx, next) => {
	_.isEmpty(models) ? ctx.apps.$models = inintModel() : ctx.apps.$models = models;

  await next();
};

export default modelsMiddlware;