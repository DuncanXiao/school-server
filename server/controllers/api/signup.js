import BaseController from '../baseController';
import { Customer, Registry } from '../../model/index';
import * as _ from 'lodash';

// account: Joi.string().required(),
// password: Joi.string().min(6).max(8).required(),
// phone: Joi.number().required(),
// schoolId: Joi.number().required(),
// name: Joi.string().required(),
// sex: Joi.string(),
// address: Joi.string()
class SignupController extends BaseController {

	insertCustomer = async(ctx) => {
		const customer = new Customer();
		const registry = new Registry();
		const {account, password, phone1, schoolId, name, sex, address1} = ctx.request.body;
		try {
			const result = await customer.transaction({
				callback: async(t) => {
					const registryResult = await registry.insertToSql({
						account: account,
						password: password
					}, {transaction: t});
					const customerResult = await customer.insertToSql({
						schoolId: schoolId,
						registryId: registryResult.id,
						name: name,
						sex: sex,
						address1: address1,
						phone1: phone1
					}, {transaction: t});
					return customerResult;
				}
			});
			return result;
		} catch (error) {
			throw error;
		}
	}
	
}

export default SignupController;
