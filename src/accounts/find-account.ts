import { AccountService } from './../services/account.service';
import { IAccount } from './../models/account';
import { autoinject } from 'aurelia-dependency-injection';
import { OrderService } from './../services/order.service';
import { Router } from 'aurelia-router';

@autoinject
export class FindAccount {
  message = 'Find Account';
  accounts: IAccount[] = null;
  pattern = '';

  constructor(private accountService: AccountService,
    private router: Router) { }

  activate() {
    this.accounts = [];
  }
  find() {
    console.log('About to run the find account function with value passed in: ' + this.pattern);
    this.accountService.findAccount(this.pattern)
      .then(accounts => this.accounts = accounts);
  }
  
    onSelectAccount(event: UIEvent, account: IAccount){
      this.router.navigateToRoute('account-detail', {id: account.accountKey})
    }

}
