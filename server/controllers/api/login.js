import BaseController from '../baseController';
import { Student, Registry } from '../../model/index';

class LoginController extends BaseController {

	login = async(ctx) => {
		const student = new Student();
		const registry = new Registry();
		const {account, password} = ctx.request.body;
		try {
      const registryData = await registry.findOneToSql({
        where: {account, password}
      });
      const data = await student.findOneToSql({
        where: {registryId: registryData.id}
      });
			return data;
		} catch (error) {
			throw error;
		}
	}
	
}

export default LoginController;
