import BaseController from '../../baseController';
import lodash from 'lodash';
import uuidv1 from 'uuid/v1';
import bcrypt from 'bcryptjs';

class AuthController extends BaseController {

	getPasswordHashSalt = (password) => {
		const salt = bcrypt.genSaltSync(10);
		return {
			passwordHash: bcrypt.hashSync(password, salt),
			salt
		};
	}

	checkPasswordHash = (password, salt, passwordHash) => {
		return passwordHash === bcrypt.hashSync(password, salt);
	}

	loginStudent = async(ctx) => {
		const { student, registry } = ctx.$db;
		const {account, password} = ctx.request.body;
		const registryData = await registry.findOne({
			where: {account}
		});
		if (this.checkPasswordHash(password, registryData.get('salt'), registryData.get('passwordHash'))) {
			const data = await student.findOne({
				where: {registryId: registryData.get('id')}
			});

			return data;
		}

		throw new Error('account passord invalidate');
	}

	signupStudent = async(ctx) => {
    const { student, studentRegistry, Sequelize, sequelize } = ctx.$db;
		const {account, password, phone, schoolId, name, sex, address1} = ctx.request.body;
		const hashSalt = this.getPasswordHashSalt(password);
		const result = await sequelize.transaction({
			isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
			}, async (t) => {
				const registryResult = await studentRegistry.create({
					account,
					...hashSalt,
					phone
				}, {transaction: t});
				const studentResult = await student.create({
					schoolId: schoolId,
					uuid: uuidv1(),
					registryId: registryResult.dataValues.id,
					name: name,
					sex: sex,
					address1: address1,
					phone1: phone,
					receiveName1: name
				}, {transaction: t});
				return studentResult.dataValues;
		}).then((result) => {
			return result;
		}).catch((error) => {
			throw error;
		});
		return result;
	}

	loginSchoolStores = async(ctx) => {
    const { schoolStore, schoolStoreRegistry } = ctx.apps.$db;
		const { account, password } = ctx.request.body;
		const registryData = await schoolStoreRegistry.findOne({
			where: { account }
		});
		if (this.checkPasswordHash(password, registryData.get('salt'), registryData.get('passwordHash'))) {
			const data = await schoolStore.findOne({
				where: { registryId: registryData.id }
			});

			return data;
		}

		throw new Error('account passord invalidate');
	}

	signupSchoolStores = async(ctx) => {
    const { schoolStore, SchoolStoreRegistry } = ctx.apps.$db;
    const registryRequest = lodash.pick(ctx.request.body, ['account', 'identityCard', 'schoolId']);
		const storeRequest = lodash.omit(ctx.request.body, ['account', 'password', 'identityCard']);
		const hashSalt = this.getPasswordHashSalt(ctx.request.body.password);
		const result = await this.transaction({
			callback: async(t) => {
				const registryResult = await SchoolStoreRegistry.create({
					...registryRequest,
					...hashSalt
				}, {transaction: t});
				const storeResult = await schoolStore.create(
					{
						...storeRequest,
						uuid: uuidv1(),
						registryId: registryResult.dataValues.id
					}, {transaction: t});

				return storeResult.dataValues;
			}
		});

		return result;
	}
}

export default AuthController;
