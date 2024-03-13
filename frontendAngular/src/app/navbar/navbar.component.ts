import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProductService } from '../service/product.service';
import { IPainting } from '../interface/IPainting';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','./navbar.component.scss'],

})
export class NavbarComponent {

  productList: IPainting[] = [];
  productImageList: any[]=[];
  products: any[] = [];
  subTotal!: any;
  loginValue: String = '';

  constructor(
    private product_service: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer,

  ) {}
  
  ngOnInit(){
    this.verifyName();

  }
  logout(){
    if (localStorage.getItem('token') != null){
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
      this.verifyName();
    }
    else{
      this.router.navigateByUrl('/login');
      this.verifyName();

    }
  }


  verifyName(){
    console.log('Teste');
    if (localStorage.getItem('token') != null){
      this.loginValue = "Logout";
    }
    else{
      this.loginValue = "Login";
    }
  }

   //Add product to Cart
   addToCart(product: any) {
    if (!this.product_service.productInCart(product)) {
      product.quantity = 1;
      this.product_service.addToCart(product);
      this.products = [...this.product_service.getProduct()];
      this.subTotal = product.price;
    }
  }

  toggleCart(){
    this.products=this.product_service.getProduct();
    this.createImage(this.products);
    console.log(this.products);
    document.querySelector('.sidecart')!.classList.toggle('open-cart');
  }

  createImage(data:IPainting[]){
    for (let i=0; i< data.length; i++){
      let imgUrl='data:image/jpeg;base64,' + (data[i].image);
      this.productImageList[i] = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    }
  }

  //Change sub total amount
  // changeSubTotal(product: any, index: any) {
  //   const qty = product.quantity;
  //   const amt = product.price;

  //   this.subTotal = amt * qty;

  //   this.product_service.saveCart();
  // }

  //Remove a Product from Cart
  removeFromCart(product: any) {
    this.product_service.removeProduct(product);
    this.products = this.product_service.getProduct();
  }

  get CartSize(){
    return this.product_service.getProduct().length;
  }

  //Calculate Total

  get total() {
    return this.product_service.getProduct().reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  checkout() {
    this.toggleCart();
    console.log("b",this.product_service.getProduct())

    localStorage.setItem('cart_total', JSON.stringify(this.total));
    console.log(this.total);
    this.router.navigate(['/payment']);
  }


}
