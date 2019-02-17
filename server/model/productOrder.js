import BaseModel from './baseModel';

class ProductOrder extends BaseModel {
  constructor() {
    super({modelName: 'productOrder'});
  }
}

export default ProductOrder;