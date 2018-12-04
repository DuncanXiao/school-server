import Boom from 'boom';
import { signToken } from '../utilities/createJwt';
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
    return ctx.cookies.get('token');
  }
  
  handlerError = (ctx, error) => {
    let boom = {};
    if (_.isEmpty(error.statusCode)) {
      boom = Boom.badRequest(error.message);
    }
    ctx.status = boom.output.statusCode;
    ctx.body = boom.output.payload;
  }
}

export default BaseController;