import { IAccount } from './../models/account';
import { AccountService } from './../services/account.service';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class ViewAccount {
  message = 'View Account';
  account: IAccount;

  constructor(private accountService: AccountService) { }

  activate(params, routeConfig) {
    // console.log('Active running...');
    this.accountService.getAccount(params.id)
      .then(account => {
        // console.log(account);
        this.account = account;
      }).catch(
      err => {
        console.log(err.message);
      }
      );
  }
}
