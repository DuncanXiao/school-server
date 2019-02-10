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

  putItemById = async(ctx) => {
    try {
      const { id } = ctx.params;
      await this.model.updateToSql(ctx.request.body, {
        where: {id}
      });
      const data = await this.model.findOneToSql({
        where: {id}
      });
			return data;
    } catch(error) {
			throw error;
    }
  }

  getList = async(options) => {
    try {
      const data = await this.model.findOneToSql({ where: options });
			return data;
    } catch(error) {
			throw error;
    }
  }
  
  insertList = async(ctx) => {
    try {
      const requestBody = ctx.request.body;
			const result = await this.model.bulkInsertToSql(requestBody);
      return result;
    } catch(error) {
			throw error;
    }
  }
}

export default BaseController;