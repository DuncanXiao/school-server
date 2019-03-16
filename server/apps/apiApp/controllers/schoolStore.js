import BaseController from '../../baseController';
import lodash from 'lodash';

class SchoolStoreController extends BaseController {
  constructor(){
    super();
  }

  index = async ctx => {
    return await ctx.$models.schoolStore.findAll({ where: {schoolId: ctx.params.schoolId} });
  }

  show = async ctx => {
    return await ctx.$models.schoolStore.findOne({ where: {uuid: ctx.params.uuid} });
  }

  update = async ctx => {
    const { uuid } = ctx.params;
    const { schoolStore } = ctx.$models;
    await schoolStore.update(lodash.omit(ctx.request.body, ['uuid']), {
      where: {uuid}
    });
    const data = await schoolStore.findOne({
      where: {uuid}
    });
    return data;
  }

  create = async ctx => {
    return await ctx.$models.schoolStore.create(ctx.request.body);
  }
}

export default SchoolStoreController;
