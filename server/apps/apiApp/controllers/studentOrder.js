import BaseController from '../../baseController';
import lodash from 'lodash';
import createOrderNumber from '../../../utilities/createOrderNumber';
import { getCurrentDate } from '../../../utilities/date';

class StudentOrderController extends BaseController {
  constructor(){
    super();
  }

  index = async (ctx) => {
    await ctx.$models.studentOrder.find({ where: { uuid: ctx.params.uuid } });
  }

  create = async (ctx) => {
    const { uuid } = ctx.params;
    const { studentOrder, productOrder } = ctx.$models;
    const studentStoreData = await this.getStudentStoreData(ctx.$models, uuid, ctx.request.body.storeUuid);
    const date = getCurrentDate();
    const orderDate = lodash.omit(ctx.request.body, ['products']);
    const products = lodash.pick(ctx.request.body, ['products']);
    const orderNumber = createOrderNumber(uuid, studentStoreData.schoolId);
    const result = await this.transaction({
      callback: async(t) => {
        const order = await studentOrder.create({
          ...orderDate, id: studentStoreData.id, storeId: studentStoreData.storeId,
           orderNumber, ...date }, {transaction: t});
        const productsRequest = this.formateProducts(products, ctx.request.body.storeUuid, date, order.dataValues.id);
        const productsDate = await productOrder.bulkCreate(productsRequest);
        order.dataValues.products = productsDate;
        return order.dataValues;
      }
    });
    return result;
  }

  getStudentStoreData = async (models, uuid, storeUuid) => {
    const { student, schoolStore } = models;
    const studentData = await student.find({
      where: {uuid},
      attributes: ['schoolId', 'id']
    });
    const storeId = await schoolStore.getId(storeUuid);
    if (!studentData && !storeId) throw new Error('bad request');
    return { id: studentData.id, storeId, schoolId: studentData.schoolId };
  }

  formateProducts = (products, storeUuId, date, studentOrderId) => {
    products.map((p) => {
      return {
        ...p, storeUuId, ...date, studentOrderId
      };
    });
  }

  update = async () => {

  }
}

export default StudentOrderController;
