import BaseModel from './baseModel';

class StudentOrder extends BaseModel {
  constructor() {
    super({modelName: 'studentOrder'});
  }
}

export default StudentOrder;