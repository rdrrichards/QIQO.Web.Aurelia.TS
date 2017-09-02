import { IInvoice } from './../models/invoice';
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';
import { CONFIG } from '../shared/config';

let _openInvoicesUrl = CONFIG.baseUrls.openinvoices;
let _invoicesUrl = CONFIG.baseUrls.invoices;

@autoinject
export class InvoiceService {
  constructor(private httpClient: HttpClient) {
  }

  getOpenInvoices(): Promise<IInvoice[]> {
    var promise = new Promise<IInvoice[]>((resolve, reject) => {
      this.httpClient.get(_openInvoicesUrl)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  findInvoice(pattern): Promise<IInvoice[]> {
    var promise = new Promise<IInvoice[]>((resolve, reject) => {
      this.httpClient.get(_invoicesUrl + '&q=' + pattern)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  getInvoice(id: number): Promise<IInvoice> {
    var promise = new Promise<IInvoice>((resolve, reject) => {
      this.httpClient.get(_invoicesUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  updateInvoice(invoice: IInvoice) {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.configure(x => {
        x.withHeader('Content-Type', 'application/json');
        x.withHeader('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
      });
      this.httpClient.post(_invoicesUrl, JSON.stringify(invoice))
        .then(data => {
          resolve(data);
        }).catch(err => reject(err));
    });
    return promise;
  }

  deleteInvoice(id) {
    var promise = new Promise((resolve, reject) => {
      this.httpClient.delete(_invoicesUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
    return promise;
  }

  getRecentInvoices() {
    return this.getOpenInvoices();
  }
}
