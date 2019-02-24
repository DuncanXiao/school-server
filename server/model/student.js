import BaseModel from './baseModel';

class Student extends BaseModel {
  constructor() {
    super({modelName: 'student'});
  }

  getId = async(uuid) => {
    return await this.findOneToSql({
      where: { uuid },
      attributes: ['id']
    });
  }
}

export default Student;