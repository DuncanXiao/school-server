import BaseController from '../baseController';
import { SchoolStoreRegistry, SchoolStore } from '../../model/index';
import * as _ from 'lodash';

class SchoolStoreRegistryController extends BaseController {
  constructor(){
    super();
    this.model = new SchoolStoreRegistry();
  }

  signup = async(ctx) => {
		const schoolStore = new SchoolStore();
    const registryRequest = _.pick(ctx.request.body, ['account', 'password', 'identityCard', 'schoolId']);
    const storeRequest = _.omit(ctx.request.body, ['account', 'password', 'identityCard']);
		try {
			const result = await schoolStore.transaction({
				callback: async(t) => {
					const registryResult = await this.model.insertToSql(registryRequest, {transaction: t});
          const studentResult = await schoolStore.insertToSql(Object.assign({}, 
            storeRequest,
            {
              registryId: registryResult.id
            }), {transaction: t});
					return studentResult;
				}
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	login = async(ctx) => {
		const store = new SchoolStore();
		const {account, password} = ctx.request.body;
		try {
      const registryData = await this.model.findOneToSql({
        where: {account, password}
      });
      const data = await store.findOneToSql({
        where: {registryId: registryData.id}
      });
			return data;
		} catch (error) {
			throw error;
		}
	}
}

export default SchoolStoreRegistryController;
