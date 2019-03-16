import Joi from 'joi';

const studentSchema = {
  get: {
    params:{
      uuid: Joi.number().required()
    }
  },
  put: {
    body: {
      schoolId: Joi.number(),
      uuid: Joi.forbidden(),
      name: Joi.string(),
      sex: Joi.string(),
      receiveName1: Joi.string(),
      receiveName2: Joi.string(),
      receiveName3: Joi.string(),
      address1: Joi.string(),
      address2: Joi.string(),
      address3: Joi.string(),
      phone1: Joi.string(),
      phone2: Joi.string(),
      phone3: Joi.string(),
      cornetPhone1: Joi.string(),
      cornetPhone2: Joi.string(),
      cornetPhone3: Joi.string(),
      headPhotoUrl: Joi.string()
    }
  }
};

export default studentSchema;