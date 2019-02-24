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

  insertItem = async(ctx) => {
    try {
      const requestBody = ctx.request.body;
			const result = await this.model.insertToSql(requestBody);
			return result;
    } catch(error) {
			throw error;
    }
  }

  getItem = async(options) => {
    try {
      const data = await this.model.findOneToSql({ where: options });
			return data;
    } catch(error) {
			throw error;
    }
  }

  putItemByUuId = async(ctx) => {
    try {
      const { uuid } = ctx.params;
      await this.model.updateToSql(_.omit(ctx.request.body, ['uuid']), {
        where: {uuid}
      });
      const data = await this.model.findOneToSql({
        where: {uuid}
      });
			return data;
    } catch(error) {
			throw error;
    }
  }

  getList = async(options) => {
    try {
      const data = await this.model.findAllToSql({ where: options });
			return data;
    } catch(error) {
			throw error;
    }
  }
  
  insertList = async(requestBody) => {
    try {
			const result = await this.model.bulkInsertToSql(requestBody);
      return result;
    } catch(error) {
			throw error;
    }
  }
}

export default BaseController;