import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from "@angular/material/dialog";
import { DialogData } from "./home.component";
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'selectedProductdialog.html',
    styleUrls: ['./SelectedProductComponent.css']
  })
  export class SelectedProductComponent {
  
    constructor(
      private navBar: NavbarComponent,

      public dialogRef: MatDialogRef<SelectedProductComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    addToCart(product: any) {

      this.navBar.addToCart(product);
    }
  
  }