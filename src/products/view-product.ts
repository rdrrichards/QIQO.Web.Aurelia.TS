import { Router } from 'aurelia-router';
import { ProductService } from './../services/product.service';
import { IProduct } from './../models/product';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject
export class ViewProduct {
  message = 'View Product';
  product: IProduct;

  constructor(private productService: ProductService, private router: Router) { }

  activate(params, routeConfig) {
    // console.log('Active running...');
    this.productService.getProduct(params.id)
      .then(product => {
        // console.log(account);
        this.product = product;
        this.message = this.message + ': ' + this.product.productCode;
      }).catch(
      err => {
        console.log(err.message);
      }
      );
  }

  edit(event: UIEvent, product: IProduct) {
    this.router.navigateToRoute('product-edit', {id: product.productKey});
  }
}
