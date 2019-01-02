import path from 'path';
import Sequelize from 'sequelize';
import sequelize from '../lib/sequelizes';
import { getFilesName } from '../utilities/getFiles';
import * as _ from 'lodash';

const models = {};

const transaction = {
	READ_UNCOMMITTED: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
	READ_COMMITTEDS: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
	REPEATABLE_READ: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
	SERIALIZABLE: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
};

const inintModel = () => {
	const sequelizeModels = path.resolve(__dirname, '../lib/sequelizes');
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
	});
};

inintModel();
// models.school.sync();
// models.registry.sync({force: true});
// models.student.sync({force: true});
// models.schoolStore.sync({force: true});
// models.student.sync({force: true});

class BaseModel {

	constructor(options) {
		this.getModel(options.modelName);
	}

	getModel(modelName) {
		this.model = models[modelName];
		this.model.sync();
	}

	getErrorMessage(error) {
		return new Error(`${error.message} sql: ${error.sql}`);
	}

	async insertToSql(values, options) {
		try{
			const instance = await this.model.create(values, options);
			return instance.dataValues;
		} catch (error) {
			throw this.getErrorMessage(error);
		}
	}

	async deleteToSql(options) {
		try{
			const instance = await this.model.destroy(options);
			return instance;
		} catch (error) {
			throw this.getErrorMessage(error);
		}
	}

	async updateToSql(values, options) {
		try{
			const instance = await this.model.update(values, options);
			return instance;
		} catch (error) {
			throw this.getErrorMessage(error);
		}
	}

	async findOneToSql(options) {
		try {
			const instance = await this.model.findOne(options);
			return instance;
		} catch (error) {
			throw this.getErrorMessage(error);
		}
	}

	async findAllToSql(options) {
		try {
			const instance = await this.model.findAll(options);
			return instance;
		} catch (error) {
			throw this.getErrorMessage(error);
		}
	}

	async transaction(options) {
		const result = await sequelize.transaction({
			isolationLevel: options.transaction ? transaction[options.transaction]: transaction.READ_UNCOMMITTED
			}, async (t) => {
				const data = await options.callback(t);
				return data;
		}).then((result) => {
			return result;
		}).catch((error) => {
			throw error;
		});
		return result;
	}
}

export default BaseModel;