import BaseController from '../../baseController';

class SignupController extends BaseController {

	insertStudent = async(ctx) => {
    const { student, registry } = ctx.apps.$models;
		const {account, password, phone, schoolId, name, sex, address1} = ctx.request.body;
		try {
			const result = await this.transaction({
				callback: async(t) => {
					const registryResult = await registry.create({
						account: account,
						password: password,
						phone: phone
					}, {transaction: t});
					const studentResult = await student.create({
						schoolId: schoolId,
						registryId: registryResult.dataValues.id,
						name: name,
						sex: sex,
						address1: address1,
						phone1: phone,
						receiveName1: name
					}, {transaction: t});
					return studentResult.dataValues;
				}
			});
			return result;
		} catch (error) {
			throw error;
		}
	}
	
}

export default SignupController;
