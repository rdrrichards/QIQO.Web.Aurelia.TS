import { RouterConfiguration, Router } from 'aurelia-router';

export class App {
  message = 'Aurelia Test Application';
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: 'orders/open-orders' }
      // { route: 'users',            name: 'users',      moduleId: 'users/index',   nav: true },
      // { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      // { route: 'files/*path',      name: 'files',      moduleId: 'files/index',   href:'#files',   nav: 0 }
    ]);

  }
}
