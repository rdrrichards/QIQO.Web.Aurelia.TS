import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { IAccount } from './../models/account';
import { AccountService } from './../services/account.service';

@autoinject
export class EditAccount {
  message: string;
  account: IAccount;
  editAccount: IAccount;

  constructor(private accountService: AccountService, private route: Router) {
    this.message = 'Edit Account';
  }

  activate(params, routeConfig) {
    this.accountService.getAccount(params.id)
      .then(account => {
        // console.log(account);
        this.account = account;
        this.editAccount = Object.assign({}, this.account);
        this.message = this.message + ': ' + this.account.accountName;
      }).catch(
      err => {
        console.log(err.message);
      }
      );
  }

  save() {
    this.accountService.updateAccount(this.editAccount)
      .then(response => {
        console.log(response);
        this.route.navigateToRoute('accounts');
      }).catch(
      err => {
        console.log(err.message);
      });
  }

  reset() {
    this.editAccount = Object.assign({}, this.account);
  }

  cancel() {
    this.route.navigateToRoute('products');
  }
}
