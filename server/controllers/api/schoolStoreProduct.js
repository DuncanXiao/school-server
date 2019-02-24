import BaseController from '../baseController';
import { SchoolStoreProduct, SchoolStore } from '../../model/index';

class SchoolStoreProductController extends BaseController {
  constructor(){
    super();
    this.model = new SchoolStoreProduct();
  }

  getStoreIdRequest = async(requestBody, storeUuid) => {
    let data = [];
    const storeId = await this.getStoreId(storeUuid);
    requestBody.map((item) => {
      data.push(Object.assign({}, item, storeId));
    });
    return data;
  }

  getStoreId = async(uuid) => {
    const model = new SchoolStore();
    const data = await model.findOneToSql({uuid});
    return data.get('id');
  }

  findProducts = async(ctx) => {
    const storeId = await this.getStoreId(ctx.params.uuid);
    await this.getList(storeId);
  }
}

export default SchoolStoreProductController;
