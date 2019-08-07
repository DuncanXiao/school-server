import Boom from 'boom';
import { signToken, verifyToken } from '../utilities/createJwt';
import * as _ from 'lodash';
require('dotenvjs').string();

class BaseController {

	setToken = (ctx, data, options) => {
    const token = signToken(data);
    let expiresTime = new Date();
    expiresTime.setHours(expiresTime.getHours + 1);
    ctx.cookies.set('token', token, {
      domain: options.domain || process.env.DOMAIN,
      expires: expiresTime
    });
  }

  getToken = (ctx) => {
    const token = ctx.header.get('token').split(' ')[1];
    const payload = verifyToken(token);
    return { token, ...payload };
  }

  handlerError = (ctx, error) => {
    let boom = {};
    if (_.isEmpty(error.statusCode)) {
      boom = Boom.badRequest(error.message);
    }
    ctx.status = boom.output.statusCode;
    ctx.body = boom.output.payload;
  }

  getId = async (model, options) => {
    return await model.find({ where: options, attributes: ['id'] });
  }
}

export default BaseController;