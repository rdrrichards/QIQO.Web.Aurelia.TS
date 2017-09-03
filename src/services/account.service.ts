import { IAccount } from './../models/account';
import { CONFIG } from './../shared/config';
import { autoinject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-http-client';

const _accountsUrl = CONFIG.baseUrls.accounts;

@autoinject
export class AccountService {

  constructor(private httpClient: HttpClient) {
  }

  findAccount(pattern: string): Promise<IAccount[]> {
    return new Promise<IAccount[]>((resolve, reject) => {
      this.httpClient.get(_accountsUrl + '&q=' + pattern)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  getAccount(id: number): Promise<IAccount> {
    return new Promise<IAccount>((resolve, reject) => {
      this.httpClient.get(_accountsUrl + '/' + id)
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

  updateAccount(account: IAccount) {
    return new Promise((resolve, reject) => {
      this.httpClient.configure(x => {
        x.withHeader('Content-Type', 'application/json');
        x.withHeader('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
      });
      this.httpClient.post(_accountsUrl, JSON.stringify(account))
        .then(data => {
          resolve(data);
        }).catch(err => reject(err));
    });
  }

  deleteAccount(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(_accountsUrl + '/' + id)
        .then(data => {
          resolve(data);
        });
    });
  }

  getRecentAccounts(): Promise<IAccount[]> {
    return new Promise<IAccount[]>((resolve, reject) => {
      this.httpClient.get(_accountsUrl + '/recent')
        .then(result => {
          resolve(JSON.parse(result.response));
        });
    });
  }

}
