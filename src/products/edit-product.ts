import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { IProduct } from './../models/product';
import { ProductService } from './../services/product.service';

@autoinject
export class EditProduct {
  message: string;
  product: IProduct;

  constructor(private productService: ProductService, private route: Router) {
    this.message = 'Edit Product';
  }

  activate(params, routeConfig) {
    this.productService.getProduct(params.id)
      .then(product => {
        this.product = product;
        this.message = this.message + ': ' + this.product.productCode + ' - ' + this.product.productName;
      }).catch(
      err => {
        console.log(err.message);
      });
  }

  save() {
    this.productService.updateProduct(this.product)
      .then(response => {
        console.log(response);
        this.route.navigateToRoute('products');
      }).catch(
      err => {
        console.log(err.message);
      });
  }
}
