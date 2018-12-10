import BaseModel from './baseModel';

class Customer extends BaseModel {
  constructor() {
    super({modelName: 'customer'});
  }
}

export default Customer;