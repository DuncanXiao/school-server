import Joi from 'joi';

const baseBody = {
  type: Joi.number().required(),
  storeId: Joi.any().forbidden(),
  studentId: Joi.any().forbidden(),
  orderNumber: Joi.any().forbidden(),
  createdAt: Joi.any().forbidden(),
  updatedAt: Joi.any().forbidden(),
};

const studentOrderSchema = {
  get: {
    params: {
      uuid: Joi.string().required()
    }
  },
  post: {
    body: Object.assign({}, baseBody, {
      storeUuid: Joi.string().required(),
      discount: Joi.number().required(),
      redPacket: Joi.number(),
      packagingFee: Joi.number(),
      expressFee: Joi.number(),
      note: Joi.string(),
      status: Joi.number(),
      products: Joi.array().items({
        name: Joi.string().required(),
        price: Joi.number().required(),
        total: Joi.number().required(),
        imageUrl: Joi.string().required()
      }).required()
    })
  },
  put: {
    body: {}
  }
};

export default studentOrderSchema;