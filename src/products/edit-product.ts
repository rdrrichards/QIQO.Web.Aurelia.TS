import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { IProduct } from './../models/product';
import { ProductService } from './../services/product.service';

@autoinject
export class EditProduct {
  message: string;
  product: IProduct;
  editProduct: IProduct;

  constructor(private productService: ProductService, private router: Router) {
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
        this.router.navigateToRoute('products');
      }).catch(
      err => {
        console.log(err.message);
      });
  }

  reset() {
    this.editProduct = Object.assign({}, this.product);
  }

  cancel() {
    this.router.navigateToRoute('product-detail', { id: this.product.productKey });
  }

  delete() {
    this.productService.deleteProduct(this.editProduct.productKey)
      .then(account => this.router.navigateToRoute('products'));
  }
}
