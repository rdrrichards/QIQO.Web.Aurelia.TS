import { IOrder } from './../models/order';
import { autoinject } from 'aurelia-dependency-injection';
import { OrderService } from './../services/order.service';

@autoinject
export class FindProduct {
  message = 'Find Product';
  orders: IOrder[];

  constructor(private orderService: OrderService) { }

  // activate() {
  //   // console.log('Active running...');
  //   this.orderService.findOrder('java')
  //     .then(orders => {
  //       // console.log(orders);
  //       this.orders = orders;
  //       // console.log(this.orders.length);
  //     }).catch(
  //     err => {
  //       console.log(err.message);
  //     }
  //     );
  // }
}
