import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { IPainting } from '../interface/IPainting';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { SelectedProductComponent } from './SelectedProductComponent';
import { ISecundaryImages } from '../interface/isecundary-images';

export interface DialogData {
  price: string;
  width: string;
  lenght: string;
  id: string;
  photo: Blob;
  secImage:Blob[];
  description:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './css/bootstrap.min.css', 'css/style.css', 'css/responsive.css', 'css/jquery.mCustomScrollbar.min.css', 'css/owl.carousel.min.css' ],
})
export class HomeComponent implements OnInit {
 
  data!: any[];
  


  dataSource!: MatTableDataSource<IPainting>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  @ViewChild(MatSort)
  sort!: MatSort;

  productSecImageList: any[] = [];

  secundaryImages: any[] = [];

  productList: IPainting[] = [];
  productImageList: any[]=[];
  products: any[] = [];
  subTotal!: any;
  constructor(
    public dialog: MatDialog,
    private product_service: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private navBar: NavbarComponent
  ) {}
  page = 0;
  size = 4;
  ngOnInit() {

    this.loadSecundaryImages('1');

    this.product_service.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res;
        this.createImage(this.productList);
        this.getData({pageIndex: this.page, pageSize: this.size});

        

        
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log('Request Completed');
      },
    });


    this.product_service.loadCart();
    this.products = this.product_service.getProduct();
    

  }

  loadSecundaryImages(paintingId: string): void {
    this.product_service.getSecundaryImagesByPaintingId(paintingId)
      .subscribe({
        next: (images) => {this.secundaryImages = images, this.createSecImage(images)},
        error: (error) => console.error('There was an error!', error)
      });
  }


  openDialog(product: any, index: any): void {
    console.log('teste');
    this.loadSecundaryImages(product.id);
    const dialogRef = this.dialog.open(SelectedProductComponent, {
      width: '50%',
      height: '55%',
      data: {id: product.id, price: product.price, photo:this.productImageList[index], width: product.width, lenght: product.lenght,secImage: this.productSecImageList, description: product.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  createImage(data:IPainting[]){
    for (let i=0; i< data.length; i++){
      let imgUrl='data:image/jpeg;base64,' + (data[i].image);
      this.productImageList[i] = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    }
  }

  createSecImage(data:IPainting[]){
    for (let i=0; i< data.length; i++){
      let imgUrl='data:image/jpeg;base64,' + (data[i].image);
      this.productSecImageList[i] = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    }
  }

  //Add product to Cart
  addToCart(product: any) {
    this.navBar.addToCart(product);
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
    this.navBar.removeFromCart(product);
  }

  //Calculate Total

  

  checkout() {
    this.navBar.checkout();
    console.log("a",this.product_service.getProduct())
  }

  setBackGroundColor(){
    return '#DDBDF1';
  }


  getData(obj:any) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.data = this.productList.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  
}




