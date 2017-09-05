import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { IAccount } from './../models/account';
import { AccountService } from './../services/account.service';

@autoinject
export class EditAccount {
  message: string;
  account: IAccount;
  editAccount: IAccount;

  constructor(private accountService: AccountService, private router: Router) {
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
        this.router.navigateToRoute('accounts');
      }).catch(
      err => {
        console.log(err.message);
      });
  }

  reset() {
    this.editAccount = Object.assign({}, this.account);
  }

  cancel() {
    this.router.navigateToRoute('account-detail', {id: this.account.accountKey});
  }

  delete() {
    this.accountService.deleteAccount(this.editAccount.accountKey)
      .then(account => this.router.navigateToRoute('accounts'));
  }

}
