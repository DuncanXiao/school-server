import BaseModel from './baseModel';

class School extends BaseModel {
  constructor() {
    super({modelName: 'school'});
  }
}

export default School;