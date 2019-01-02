import BaseController from '../baseController';
import { SchoolStore } from '../../model/index';

class SchoolStoreController extends BaseController {
  constructor(){
    super();
    this.model = new SchoolStore();
  }

  getList = async(ctx) => {
    try {
      const { schoolId } = ctx.params;
      const data = await this.model.findAllToSql({ where: {schoolId} });
			return data;
    } catch(error) {
			throw error;
    }
  }
}

export default SchoolStoreController;
