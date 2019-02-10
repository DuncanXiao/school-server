import Joi from 'joi';

const storeId = {storeId: Joi.number().required()};
const forbiddenStoreId = {storeId: Joi.number().forbidden()};

const bodyRequest = {
	name: Joi.string().required(),
	address: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  type: Joi.string(),
  sellOut: Joi.boolean(),
  sale: Joi.number().required(),
  imageUrl: Joi.string().required()
};

const schoolStoreProductSchema = {
	list: {
		get: {
			params: storeId
		},
		post: {
			params: storeId,
			body: Joi.array().items(Object.assign({}, bodyRequest, forbiddenStoreId))
		}
	}
};

export default schoolStoreProductSchema;