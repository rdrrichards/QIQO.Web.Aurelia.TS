import { IOrder } from './../models/order';
import { autoinject } from 'aurelia-dependency-injection';
import { OrderService } from './../services/order.service';

@autoinject
export class ViewOrder {
  message = 'View Order';
  order: IOrder;

  constructor(private orderService: OrderService) { }

  activate() {
    // console.log('Active running...');
    this.orderService.getOrder(104)
      .then(order => {
        // console.log(orders);
        this.order = order;
        // console.log(this.orders.length);
      }).catch(
      err => {
        console.log(err.message);
      }
      );
  }
}
