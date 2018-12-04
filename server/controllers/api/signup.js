import BaseController from '../baseController';
import EmailModel from 'Model/emailModel';
import * as _ from 'lodash';

class SignupController extends BaseController {

	insertEmail = async(ctx) => {
		try {
			const emailModel = new EmailModel();
			const data = await emailModel.insertToSql(ctx.request.body);
			if (_.isEmpty(data)) {
				throw new Error('Email | password is invalidate');
			}
			this.setToken();
			return data;
		} catch (error) {
			throw error;
		}
	}
	
}

export default SignupController;
