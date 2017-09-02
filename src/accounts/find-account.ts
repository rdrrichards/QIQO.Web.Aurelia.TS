import { IAccount } from './../models/account';
import { autoinject } from 'aurelia-dependency-injection';
import { OrderService } from './../services/order.service';

@autoinject
export class FindAccount {
  message = 'Find Account';
  accounts: IAccount[];
  pattern = '';

  constructor(private accountService: AccountService) { }

  activate() {
    this.accounts = [];
  }
  find() {
    console.log('About to run the find account function with value passed in: ' + this.pattern);
    this.accountService.findAccount(this.pattern)
      .then(accounts => this.accounts = accounts);
  }

}
