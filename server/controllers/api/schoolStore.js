import BaseController from '../baseController';
import { SchoolStore } from '../../model/index';

class SchoolStoreController extends BaseController {
  constructor(){
    super();
    this.model = new SchoolStore();
  }
}

export default SchoolStoreController;
