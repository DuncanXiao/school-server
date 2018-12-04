import path from 'path';
import sequelize from './sequelizes';
import { getFilesName } from '../utilities/getFiles';

const modelMap = {};

const inintModel = () => {
	const sequelizeModels = path.resolve(__dirname, './sequelizes');
	const ignoreFilesName = ['index.js'];
	const modelFilesName = getFilesName({ignoreFilesName, rootPath: sequelizeModels});
	modelFilesName.forEach((fileName) => {
		const model = sequelize.import(`${sequelizeModels}/${fileName}`);
		modelMap[`${fileName.replace(/.js/, '')}Model`] = model;
	});
};

inintModel();

class BaseModel {

	constructor(options) {
		this.getModel(options.modelName);
	}

	getModel(modelName) {
		this.model = modelMap[modelName];
		this.model.sync();
	}

	async insertToSql(values, options) {
		try{
			const instance = await this.model.create(values, options);
			return instance.dataValues;
		} catch (error) {
			throw new Error(`${error.message} sql: ${error.sql}`);
		}
	}

	async deleteToSql(options) {
		try{
			const instance = await this.model.destroy(options);
			return instance;
		} catch (error) {
			throw new Error(`${error.message} sql: ${error.sql}`);
		}
	}

	async updateToSql(values, options) {
		try{
			const instance = await this.model.update(values, options);
			return instance;
		} catch (error) {
			throw new Error(`${error.message} sql: ${error.sql}`);
		}
	}

	async findOneToSql(options) {
		try {
			const instance = await this.model.findOne(options);
			return instance;
		} catch (error) {
			throw new Error(`${error.message} sql: ${error.sql}`);
		}
	}
}

export default BaseModel;