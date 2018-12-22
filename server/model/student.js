import BaseModel from './baseModel';

class Student extends BaseModel {
  constructor() {
    super({modelName: 'student'});
  }
}

export default Student;