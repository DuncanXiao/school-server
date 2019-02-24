import BaseController from '../baseController';
import { SchoolStore } from '../../model/index';

class SchoolStoreController extends BaseController {
  constructor(){
    super();
    this.model = new SchoolStore();
  }

  getId = async(uuid) => {
    return await this.findOneToSql({
      where: { uuid },
      attributes: ['id']
    });
  }
}

export default SchoolStoreController;
