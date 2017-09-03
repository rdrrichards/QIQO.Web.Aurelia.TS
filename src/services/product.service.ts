import { IProductPage } from './../models/product-page';
import { IProduct } from './../models/product';
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';
import { CONFIG } from '../shared/config';

const _productsUrl = CONFIG.baseUrls.products;

@autoinject
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  findProduct(pattern: string): Promise<IProductPage> {
    return new Promise<IProductPage>((resolve, reject) => {
      this.httpClient.get(_productsUrl + '&q=' + pattern)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  getProduct(id: number): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      this.httpClient.get(_productsUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  updateProduct(product: IProduct): Promise<any> {
    console.log('About to run the updateProduct function with value: ' + product.productName);
    return new Promise((resolve, reject) => {
      this.httpClient.configure(x => {
        x.withHeader('Content-Type', 'application/json');
        x.withHeader('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
      });
      this.httpClient.post(_productsUrl, JSON.stringify(product))
        .then(data => {
          resolve(data);
        }).catch(err => reject(err));
    });
  }

  deleteProduct(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(_productsUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  getRecentProducts(): Promise<IProduct[]> {
    return new Promise<IProduct[]>((resolve, reject) => {
      this.httpClient.get(_productsUrl + '/recent')
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }
}
