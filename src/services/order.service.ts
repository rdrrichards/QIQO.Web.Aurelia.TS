import { IOrder } from './../models/order';
import { CONFIG } from './../shared/config';
import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-http-client';

const _openOrdersUrl = CONFIG.baseUrls.openorders;
const _ordersUrl = CONFIG.baseUrls.orders;

@autoinject
export class OrderService {
  // orders: IOrder[];
  constructor(private httpClient: HttpClient) {

  }

  getOpenOrderForCurrent(): Promise<IOrder[]> {
    return new Promise<IOrder[]>((resolve, reject) => {
      this.httpClient.get(_openOrdersUrl)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  findOrder(pattern): Promise<IOrder[]> {
    return new Promise<IOrder[]>((resolve, reject) => {
      this.httpClient.get(_ordersUrl + '&q=' + pattern)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  getOrder(id): Promise<IOrder> {
    return new Promise<IOrder>((resolve, reject) => {
      this.httpClient.get(_ordersUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  updateOrder(order) {
    return new Promise((resolve, reject) => {
      this.httpClient.configure(x => {
        x.withHeader('Content-Type', 'application/json');
        x.withHeader('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
      });
      this.httpClient.post(_ordersUrl, JSON.stringify(order))
        .then(data => {
          resolve(data);
        }).catch(err => reject(err));
    });
  }

  deleteOrder(id) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(_ordersUrl + '/' + id)
        .then(result => {
          return JSON.parse(result.response);
        }).catch(err => reject(err));
    });
  }

  getRecentOrders() {
    return this.getOpenOrderForCurrent();
  }

}
