import { IOrder } from './../models/order';
import { CONFIG } from './../shared/config';
import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-http-client';

let _openOrdersUrl = CONFIG.baseUrls.openorders;
let _ordersUrl = CONFIG.baseUrls.orders;

@autoinject
export class OrderService {
  // orders: IOrder[];
  constructor(private httpClient: HttpClient) {

  }

  getOpenOrderForCurrent(): Promise<IOrder[]> {
    var promise = new Promise<IOrder[]>((resolve, reject) => {
      this.httpClient.get(_openOrdersUrl)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  findOrder(pattern): Promise<IOrder[]> {
    var promise = new Promise<IOrder[]>((resolve, reject) => {
      this.httpClient.get(_ordersUrl + '&q=' + pattern)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  getOrder(id): Promise<IOrder> {
    var promise = new Promise<IOrder>((resolve, reject) => {
      this.httpClient.get(_ordersUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
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
        }).catch(err => reject(err));
    });
    return promise;
  }

  getRecentOrders() {
    return this.getOpenOrderForCurrent();
  }

}
