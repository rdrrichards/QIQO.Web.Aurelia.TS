import { Router } from 'aurelia-router';
import { IOrder } from './../models/order';
import { autoinject } from 'aurelia-dependency-injection';
import { OrderService } from './../services/order.service';

@autoinject
export class FindOrders {
  message = 'Find Orders';
  orders: IOrder[];
  pattern = '';

  constructor(private orderService: OrderService,
    private router: Router) { }

  activate() {
    this.orders = [];
  }

  find() {
    if (this.pattern !== '') {
    console.log('About to run the find invoice function with value passed in: ' + this.pattern);
      this.orderService.findOrder(this.pattern)
        .then(invoices => this.orders = invoices).catch(err => console.log(err.message));
    }
  }

  onSelectOrder(event: UIEvent, order: IOrder) {
    this.router.navigateToRoute('order-detail', { id: order.orderKey })
  }
}
