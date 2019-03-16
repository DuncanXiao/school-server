import Joi from 'joi';

const baseBody = {
	account: Joi.string().required(),
	password: Joi.string().min(6).max(8).required(),
};

const authSchema = {
	loginStudent: {
		body: baseBody
	},
	signupStudent: {
		body: {
			...baseBody,
			phone: Joi.string().required(),
			schoolId: Joi.number().required(),
			name: Joi.string().required(),
			sex: Joi.string().required(),
			address1: Joi.string().required()
		}
	},
	loginSchoolStore: {
		body: baseBody
	},
	signupSchoolStore: {
		body: {
			...baseBody,
			schoolId: Joi.number().required(),
			registryId: Joi.number().required(),
			type: Joi.number().required(),
			name: Joi.string().required(),
			address: Joi.string().required(),
			phone1: Joi.string()
		}
	}
};

export default authSchema;