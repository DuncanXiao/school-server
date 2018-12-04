import Joi from 'joi';

const loginSchema = {
	body: {
		email: Joi.string().email({ minDomainAtoms: 2 }).required(),
		password: Joi.string().min(6).max(8).required()
	}
};

export default loginSchema;