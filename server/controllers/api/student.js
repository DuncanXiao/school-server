import BaseController from '../baseController';
import { Student } from '../../model/index';

class StudentController extends BaseController {
  constructor(){
    super();
    this.model = new Student();
  }
}

export default StudentController;
