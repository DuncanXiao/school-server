import path from 'path';
import sequelize from '../models';
import { getFilesName } from './getFiles';
import * as _ from 'lodash';

const getModels = () => {
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

export default getModels;