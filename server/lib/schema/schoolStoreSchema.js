import Joi from 'joi';

const id = {id: Joi.number().required()};
const schoolId = {schoolId: Joi.number().required()};
const params = Object.assign({}, id, schoolId);

const bodyRequest = {
	type: Joi.number().required(),
	name: Joi.string().required(),
	address: Joi.string().required(),
	description: Joi.string(),
	phone1: Joi.string().required(),
	phone2: Joi.string(),
	phone3: Joi.string()
};

const schoolStoreSchema = {
	list: {
		get: {
			params: schoolId
		}
	},
	item: {
		put: {
			params: params,
			body: Object.assign({}, bodyRequest, schoolId)
		},
		get: {
			params: params
		},
		post: {
			params: schoolId,
			body: Object.assign({}, bodyRequest, schoolId)
		}
	}
};

export default schoolStoreSchema;