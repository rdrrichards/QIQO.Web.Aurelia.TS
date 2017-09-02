import { IOrder } from './../models/order';
import { autoinject } from 'aurelia-dependency-injection';
import { OrderService } from './../services/order.service';
import { Router } from 'aurelia-router'

@autoinject
export class OpenOrders {
  message = 'Open Orders';
  orders: IOrder[];
  selectedOrderKey: number;

  constructor(private orderService: OrderService,
    private router: Router) { }

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

  onSelectOrder(event: UIEvent, order: IOrder){
    this.router.navigateToRoute('order-detail', {id: order.orderKey})
  }
}
