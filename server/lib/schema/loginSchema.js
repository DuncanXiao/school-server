import Joi from 'joi';

const loginSchema = {
	body: {
		account: Joi.string(),
		password: Joi.string().min(6).max(8),
		phone: Joi.string(),
		cornetPhone: Joi.string()
	}
};

export default loginSchema;