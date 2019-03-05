import BaseController from '../../baseController';

class LoginController extends BaseController {

	login = async(ctx) => {
		const { student, registry } = ctx.apps.$models;
		const {account, password} = ctx.request.body;
		try {
      const registryData = await registry.findOne({
        where: {account, password}
      });
      const data = await student.findOne({
        where: {registryId: registryData.id}
      });
			return data;
		} catch (error) {
			throw error;
		}
	}
	
}

export default LoginController;
