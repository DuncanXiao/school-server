import Joi from 'joi';

const baseRequest = {
	account: Joi.string(),
	password: Joi.string().min(6).max(8)
};

const schoolStoreRegistrySchema = {
	signup: {
		body: Object.assign({}, baseRequest, {
			schoolId: Joi.number(),
			registryId: Joi.number(),
			type: Joi.number(),
			name: Joi.string(),
			address: Joi.string(),
			phone1: Joi.string()
		})
	},
	login: {
		body: baseRequest
	}
};

export default schoolStoreRegistrySchema;