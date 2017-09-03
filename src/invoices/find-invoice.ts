import { Router } from 'aurelia-router';
import { IInvoice } from './../models/invoice';
import { InvoiceService } from './../services/invoice.service';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class FindInvoice {
  message = 'Find Invoice';
  invoices: IInvoice[];
  pattern = '';

  constructor(private invoiceService: InvoiceService,
    private router: Router) { }

  activate() {
    this.invoices = [];
  }

  find() {
    if (this.pattern !== '') {
    console.log('About to run the find invoice function with value passed in: ' + this.pattern);
      this.invoiceService.findInvoice(this.pattern)
        .then(invoices => this.invoices = invoices).catch(err => console.log(err.message));
    } else {
      this.invoices = null;
    }
  }

  onSelectInvoice(event: UIEvent, invoice: IInvoice) {
    this.router.navigateToRoute('invoice-detail', { id: invoice.invoiceKey })
  }
}
