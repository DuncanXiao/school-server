import BaseController from '../baseController';
import { SchoolStoreProduct } from '../../model/index';

class SchoolStoreProductController extends BaseController {
  constructor(){
    super();
    this.model = new SchoolStoreProduct();
  }

  getStoreIdRequest = (requestBody, storeData) => {
    let data = [];
    requestBody.map((item) => {
      data.push(Object.assign({}, item, storeData));
    });
    return data;
  }
}

export default SchoolStoreProductController;
