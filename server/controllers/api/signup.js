import BaseController from '../baseController';
import { Customer, Registry } from '../../model/index';

class SignupController extends BaseController {

	insertCustomer = async(ctx) => {
		const customer = new Customer();
		const registry = new Registry();
		const {account, password, phone, schoolId, name, sex, address1} = ctx.request.body;
		try {
			const result = await customer.transaction({
				callback: async(t) => {
					const registryResult = await registry.insertToSql({
						account: account,
						password: password,
						phone: phone
					}, {transaction: t});
					const customerResult = await customer.insertToSql({
						schoolId: schoolId,
						registryId: registryResult.id,
						name: name,
						sex: sex,
						address1: address1,
						phone1: phone,
						receiveName1: name
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
