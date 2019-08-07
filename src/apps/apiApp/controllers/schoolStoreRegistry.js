import BaseController from '../../baseController';
import * as _ from 'lodash';

class SchoolStoreRegistryController extends BaseController {
  constructor(){
    super();
  }

  signup = async(ctx) => {
    const { schoolStore, SchoolStoreRegistry } = ctx.$db;
    const registryRequest = _.pick(ctx.request.body, ['account', 'password', 'identityCard', 'schoolId']);
    const storeRequest = _.omit(ctx.request.body, ['account', 'password', 'identityCard']);
		try {
			const result = await this.transaction({
				callback: async(t) => {
					const registryResult = await SchoolStoreRegistry.create(registryRequest, {transaction: t});
          const studentResult = await schoolStore.create(Object.assign({},
            storeRequest,
            {
              registryId: registryResult.dataValues.id
            }), {transaction: t});
					return studentResult.dataValues;
				}
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	login = async(ctx) => {
    const { schoolStore, schoolStoreRegistry } = ctx.$db;
		const { account, password } = ctx.request.body;
		try {
      const registryData = await schoolStoreRegistry.findOne({
        where: { account, password }
      });
      const data = await schoolStore.findOne({
        where: { registryId: registryData.id }
      });
			return data;
		} catch (error) {
			throw error;
		}
	}
}

export default SchoolStoreRegistryController;
