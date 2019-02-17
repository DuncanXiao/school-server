import Joi from 'joi';

const baseBody = {
  storeId: Joi.number().required(),
  studentId: Joi.number().required(),
  type: Joi.number().required()
};

const studentOrderSchema = {
  get: {
    params: baseBody
  },
  post: {
    body: Object.assign({}, baseBody, {
      discount: Joi.number().required(),
      redPacket: Joi.number().required(),
      packagingFee: Joi.number().required(),
      expressFee: Joi.number().required(),
      product: Joi.array().items({
        name: Joi.string().required(),
        price: Joi.number().required(),
        total: Joi.number().required(),
        imageUrl: Joi.string().required()
      })
    })
  }
};

export default studentOrderSchema;