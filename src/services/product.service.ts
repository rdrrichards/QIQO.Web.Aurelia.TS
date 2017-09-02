import { IProductPage } from './../models/product-page';
import { IProduct } from './../models/product';
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';
import { CONFIG } from '../shared/config';

let _productsUrl = CONFIG.baseUrls.products;

@autoinject
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  findProduct(pattern: string): Promise<IProductPage> {
    var promise = new Promise<IProductPage>((resolve, reject) => {
      this.httpClient.get(_productsUrl + '&q=' + pattern)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  getProduct(id: number): Promise<IProduct> {
    var promise = new Promise<IProduct>((resolve, reject) => {
      this.httpClient.get(_productsUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  updateProduct(product: IProduct): Promise<any> {
    console.log('About to run the updateProduct function with value: ' + product.productName);
    var promise = new Promise((resolve, reject) => {
      this.httpClient.configure(x => {
        x.withHeader('Content-Type', 'application/json');
        x.withHeader('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
      });
      this.httpClient.post(_productsUrl, JSON.stringify(product))
        .then(data => {
          resolve(data);
        }).catch(err => reject(err));
    });
    return promise;
  }

  deleteProduct(id: number): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.delete(_productsUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  getRecentProducts(): Promise<IProduct[]> {
    var promise = new Promise<IProduct[]>((resolve, reject) => {
      this.httpClient.get(_productsUrl + '/recent')
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }
}
