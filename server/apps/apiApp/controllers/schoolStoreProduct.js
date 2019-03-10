import BaseController from '../../baseController';

class SchoolStoreProductController extends BaseController {
  constructor(){
    super();
  }

  create = async ctx => {
    let data = [];
    const { schoolStore, schoolStoreProduct } = ctx.apps.$models;
    const storeId = await this.getStoreId(schoolStore, ctx.params.uuid);
    ctx.request.body.map((item) => {
      data.push(Object.assign({}, item, storeId));
    });
    return await schoolStoreProduct.bulkCreate(data);
  }

  index = async ctx => {
    const { schoolStore, schoolStoreProduct } = ctx.apps.$models;
    const storeId = await this.getStoreId(schoolStore, ctx.params.uuid);
    return await schoolStoreProduct.findAll({ where: {storeId} });
  }

  getStoreId = async(model, uuid) => {
    const data = await model.findOne({ where: {uuid} });
    return data.get('id');
  }
}

export default SchoolStoreProductController;
