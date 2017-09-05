import { Router } from 'aurelia-router';
import { IAccount } from './../models/account';
import { AccountService } from './../services/account.service';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class ViewAccount {
  message = 'View Account';
  account: IAccount;

  constructor(private accountService: AccountService, private router: Router) { }

  activate(params, routeConfig) {
    // console.log('Active running...');
    this.accountService.getAccount(params.id)
      .then(account => {
        // console.log(account);
        this.account = account;
        this.message = this.message + ': ' + this.account.accountName;
      }).catch(
      err => {
        console.log(err.message);
      }
      );
  }

  edit(event: UIEvent, account: IAccount) {
    this.router.navigateToRoute('account-edit', { id: account.accountKey });
  }
}
