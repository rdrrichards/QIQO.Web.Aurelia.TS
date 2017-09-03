import { AccountService } from './../services/account.service';
import { IAccount } from './../models/account';
import { autoinject } from 'aurelia-dependency-injection';
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
    if (this.pattern !== '') {
    console.log('About to run the find account function with value passed in: ' + this.pattern);
      this.accountService.findAccount(this.pattern)
        .then(accounts => this.accounts = accounts).catch(err => console.log(err.message));
    }
  }

  onSelectAccount(event: UIEvent, account: IAccount) {
    this.router.navigateToRoute('account-detail', { id: account.accountKey })
  }

}
