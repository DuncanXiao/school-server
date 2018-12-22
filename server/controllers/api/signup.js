import BaseController from '../baseController';
import { Student, Registry } from '../../model/index';

class SignupController extends BaseController {

	insertStudent = async(ctx) => {
		const student = new Student();
		const registry = new Registry();
		const {account, password, phone, schoolId, name, sex, address1} = ctx.request.body;
		try {
			const result = await student.transaction({
				callback: async(t) => {
					const registryResult = await registry.insertToSql({
						account: account,
						password: password,
						phone: phone
					}, {transaction: t});
					const studentResult = await student.insertToSql({
						schoolId: schoolId,
						registryId: registryResult.id,
						name: name,
						sex: sex,
						address1: address1,
						phone1: phone,
						receiveName1: name
					}, {transaction: t});
					return studentResult;
				}
			});
			return result;
		} catch (error) {
			throw error;
		}
	}
	
}

export default SignupController;
