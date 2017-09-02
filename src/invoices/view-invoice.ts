import { InvoiceService } from './../services/invoice.service';
import { IInvoice } from './../models/invoice';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class ViewInvoice {
  message = 'View Invoice';
  invoice: IInvoice;

  constructor(private invoiceService: InvoiceService) { }

  activate(params, routeConfig) {
    // console.log('Active running...');
    this.invoiceService.getInvoice(params.id)
      .then(invoice => {
        // console.log(account);
        this.invoice = invoice;
        this.message = this.message + ': ' + this.invoice.invoiceNumber;
      }).catch(
      err => {
        console.log(err.message);
      }
      );
  }
}
