import { IOrder } from './../models/order';
import { autoinject } from 'aurelia-dependency-injection';
import { OrderService } from './../services/order.service';

@autoinject
export class OpenOrders {
  message = 'Open Orders';
  orders: IOrder[];

  constructor(private orderService: OrderService) { }

  activate() {
    // console.log('Active running...');
    this.orderService.getOpenOrderForCurrent()
      .then(orders => {
        // console.log(orders);
        this.orders = orders;
        // console.log(this.orders.length);
      }).catch(
      err => {
        console.log(err.message);
      }
      );
  }
}
