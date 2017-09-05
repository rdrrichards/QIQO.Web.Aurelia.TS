import { Router } from 'aurelia-router';
import { IProductPage } from './../models/product-page';
import { IProduct } from './../models/product';
import { ProductService } from './../services/product.service';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class FindProduct {
  message = 'Find Product';
  pattern = '';
  page: IProductPage;
  bindingSpinner = false;
  bindingResults = false;

  constructor(private productService: ProductService,
    private router: Router) {
  }

  async find() {
    if (this.pattern !== '') {
      this.bindingSpinner = true;
      console.log('About to run the find product function with value: ' + this.pattern);
      await this.productService.findProduct(this.pattern)
        .then(page => this.page = page);
      this.bindingSpinner = false;
      // console.log(this.page);
      this.bindingResults = (this.page && this.page.totalCount !== 0); //  && this.page.results.length === 0
    } else {
      this.page = null;
      this.bindingResults = false;
    }
  }

  onSelectProduct(event: UIEvent, product: IProduct) {
    this.router.navigateToRoute('product-detail', { id: product.productKey });
  }

  next(page: number, pageSize: number, orderBy: string, category: string) {

  }
}
