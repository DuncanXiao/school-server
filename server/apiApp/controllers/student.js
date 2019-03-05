import BaseController from '../../baseController';
import lodash from 'lodash';

class StudentController extends BaseController {
  constructor(){
    super();
  }

  show = async ctx => {
    return await ctx.apps.$models.student.findOne({ where: {uuid: ctx.params.uuid} });
  }

  update = async ctx => {
    const { student } = ctx.apps.$models.student;
    const { uuid } = ctx.params;
    await student.update(lodash.omit(ctx.request.body, ['uuid']), {
      where: {uuid}
    });
    return await student.findOne({
      where: {uuid}
    });
  }
}

export default StudentController;
