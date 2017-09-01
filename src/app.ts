import { RouterConfiguration, Router } from 'aurelia-router';

export class App {
  message = 'Aurelia Test Application';
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'openorders'], name: 'openorders', moduleId: 'orders/open-orders', title: 'Open Orders', nav: true },
      { route: 'accounts', name: 'accounts', moduleId: 'accounts/find-account', title: 'Find Accounts', nav: true },
      { route: 'orders', name: 'orders', moduleId: 'orders/find-order', title: 'Find Order', nav: true },
      { route: 'invoices', name: 'invoices', moduleId: 'invoices/find-invoice', title: 'Find Invoices', nav: true },
      { route: 'products', name: 'products', moduleId: 'products/find-product', title: 'Find Products', nav: true },
      { route: 'orders/:id', name: 'order-detail', moduleId: 'orders/view-order', title: 'Open Orders', nav: false },
      { route: 'products/:id', name: 'product-detail', moduleId: 'products/view-product', title: 'View Product', nav: false },
      { route: 'products/edit/:id', name: 'product-edit', moduleId: 'products/edit-product', title: 'Edit Product', nav: false },
      { route: 'accounts/:id', name: 'account-detail', moduleId: 'accounts/view-account', title: 'View Account', nav: false }
    ]);

  }
}
