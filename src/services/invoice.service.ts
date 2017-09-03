import { IInvoice } from './../models/invoice';
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';
import { CONFIG } from '../shared/config';

const _openInvoicesUrl = CONFIG.baseUrls.openinvoices;
const _invoicesUrl = CONFIG.baseUrls.invoices;

@autoinject
export class InvoiceService {
  constructor(private httpClient: HttpClient) {
  }

  getOpenInvoices(): Promise<IInvoice[]> {
    return new Promise<IInvoice[]>((resolve, reject) => {
      this.httpClient.get(_openInvoicesUrl)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  findInvoice(pattern): Promise<IInvoice[]> {
    return new Promise<IInvoice[]>((resolve, reject) => {
      this.httpClient.get(_invoicesUrl + '&q=' + pattern)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  getInvoice(id: number): Promise<IInvoice> {
    return new Promise<IInvoice>((resolve, reject) => {
      this.httpClient.get(_invoicesUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  updateInvoice(invoice: IInvoice) {
    return new Promise((resolve, reject) => {
      this.httpClient.configure(x => {
        x.withHeader('Content-Type', 'application/json');
        x.withHeader('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
      });
      this.httpClient.post(_invoicesUrl, JSON.stringify(invoice))
        .then(data => {
          resolve(data);
        }).catch(err => reject(err));
    });
  }

  deleteInvoice(id) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(_invoicesUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  getRecentInvoices() {
    return this.getOpenInvoices();
  }
}
