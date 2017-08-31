import { IOrder } from './../models/order';
import { CONFIG } from './../shared/config';
import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-http-client';

let _openOrdersUrl = CONFIG.baseUrls.openorders;
let _ordersUrl = CONFIG.baseUrls.orders;

@autoinject
export class OrderService {
  orders: IOrder[];
  constructor(private httpClient: HttpClient) {

  }

  getOpenOrderForCurrent(): any {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.get(_openOrdersUrl)
        .then(result => {
          var data = JSON.parse(result.response);
          this.orders = data;
          resolve(this.orders);
        });
    });
    return promise;
  }

  findOrder(pattern) {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.get(_ordersUrl + '&q=' + pattern)
        .then(result => {
          return JSON.parse(result.response);
        });
    });
    return promise;
  }

  getOrder(id) {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.get(_ordersUrl + '/' + id)
        .then(result => {
          return JSON.parse(result.response);
        });
    });
    return promise;
  }

  updateOrder(order) {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.configure(x => {
        x.withHeader('Content-Type', 'application/json');
        x.withHeader('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
      });
      this.httpClient.post(_ordersUrl, JSON.stringify(order))
        .then(data => {
          resolve(data);
        }).catch(err => reject(err));
    });
    return promise;
  }

  deleteOrder(id) {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.delete(_ordersUrl + '/' + id)
        .then(result => {
          return JSON.parse(result.response);
        });
    });
    return promise;
  }

  getRecentOrders() {
    return this.getOpenOrderForCurrent();
  }

}
