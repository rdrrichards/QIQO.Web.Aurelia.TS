import { Router } from 'aurelia-router';
import { IProductPage } from './../models/product-page';
import { IProduct } from './../models/product';
import { ProductService } from './../services/product.service';
import { IOrder } from './../models/order';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class FindProduct {
  message = 'Find Product';
  orders: IOrder[];
  pattern = '';
  page: IProductPage;

  constructor(private productService: ProductService,
    private router: Router) { }

  // activate() {
  // }

  find() {
    console.log('About to run the find product function with value: ' + this.pattern);
    this.productService.findProduct(this.pattern)
      .then(page => this.page = page);
  }

  onSelectProduct(event: UIEvent, product: IProduct) {
    this.router.navigateToRoute('product-detail', { id: product.productKey })
  }
}
