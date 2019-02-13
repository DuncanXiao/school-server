import Joi from 'joi';

const signupSchema = {
	body: {
		account: Joi.string().required(),
		password: Joi.string().min(6).max(8).required(),
		phone: Joi.string().required(),
		schoolId: Joi.number().required(),
		name: Joi.string().required(),
		sex: Joi.string().required(),
		address1: Joi.string().required(),
		cornetPhone: Joi.string()
	}
};

export default signupSchema;