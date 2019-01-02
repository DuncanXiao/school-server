import BaseController from '../baseController';
import { Student } from '../../model/index';

class StudentController extends BaseController {
  constructor(){
    super();
    this.student = new Student();
  }

  get = async(ctx) => {
    const { id } = ctx.params;
    try {
      const data = await this.student.findOneToSql({ where: {id: id} });
      return data;
    } catch(error) {
			throw error;
    }
  }

	put = async(ctx) => {
		try {
      await this.student.updateToSql(ctx.request.body, {
        where: {
          id: ctx.params.id
        }
      });
      const data = await this.student.findOneToSql({
        where: {
          id: ctx.params.id
        }
      });
			return data;
		} catch (error) {
			throw error;
		}
  }
	
}

export default StudentController;
