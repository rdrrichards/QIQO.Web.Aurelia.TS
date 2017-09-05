import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { IProduct } from './../models/product';
import { ProductService } from './../services/product.service';

@autoinject
export class EditProduct {
  message: string;
  product: IProduct;
  editProduct: IProduct;

  constructor(private productService: ProductService, private route: Router) {
    this.message = 'Edit Product';
  }

  activate(params, routeConfig) {
    this.productService.getProduct(params.id)
      .then(product => {
        this.product = product;
        this.editProduct = Object.assign({}, this.product);
        this.message = this.message + ': ' + this.product.productCode + ' - ' + this.product.productName;
      }).catch(
      err => {
        console.log(err.message);
      });
  }

  save() {
    this.productService.updateProduct(this.editProduct)
      .then(response => {
        console.log(response);
        this.route.navigateToRoute('products');
      }).catch(
      err => {
        console.log(err.message);
      });
  }

  reset() {
    this.editProduct = Object.assign({}, this.product);
  }

  cancel() {
    this.route.navigateToRoute('products');
  }

  delete() {
    this.productService.deleteProduct(this.editProduct.productKey)
      .then(account => this.route.navigateToRoute('products'));
  }
}
