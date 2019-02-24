import BaseController from '../baseController';
import { StudentOrder, Student, SchoolStore, ProductOrder } from '../../model/index';
import lodash from 'lodash';
import createOrderNumber from '../../utilities/createOrderNumber';
import { getCurrentDate } from '../../utilities/date';

class StudentOrderController extends BaseController {
  constructor(){
    super();
    this.model = new StudentOrder();
  }

  getStudentStoreData = async (uuid, storeUuid) => {
    const student = new Student();
    const schoolStore = new SchoolStore();
    const studentData = await student.findOneToSql({
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

  createOne = async (ctx) => {
    const { uuid } = ctx.params;
    const studentStoreData = await this.getStudentStoreData(uuid, ctx.request.body.storeUuid);
    const date = getCurrentDate();
    const orderDate = lodash.omit(ctx.request.body, ['products']);
    const products = lodash.pick(ctx.request.body, ['products']);
    const orderNumber = createOrderNumber(uuid, studentStoreData.schoolId);
    const productOrder = new ProductOrder();
    const result = await this.model.transaction({
      callback: async(t) => {
        const order = await this.model.insertToSql({ 
          ...orderDate, id: studentStoreData.id, storeId: studentStoreData.storeId,
           orderNumber, ...date }, {transaction: t});
        const productsRequest = this.formateProducts(products, ctx.request.body.storeUuid, date, order.id);  
        const productsDate = await productOrder.bulkInsertToSql(productsRequest);
        order.products = productsDate;
        return order;
      }
    });
    return result;
  }

  update = async () => {
    
  }
}

export default StudentOrderController;
