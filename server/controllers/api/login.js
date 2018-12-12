import BaseController from '../baseController';
import { Customer, Registry } from '../../model/index';

class LoginController extends BaseController {

	login = async(ctx) => {
		const customer = new Customer();
		const registry = new Registry();
		const {account, password} = ctx.request.body;
		try {
      const registryData = await registry.findOneToSql({
        where: {account, password}
      });
      const data = await customer.findOneToSql({
        where: {registryId: registryData.id}
      });
			return data;
		} catch (error) {
			throw error;
		}
	}
	
}

export default LoginController;
