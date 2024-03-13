import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { IPainting } from '../interface/IPainting';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css','./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  product: IPainting;

  message:string;

  error=false;
  submitted = false;

  selectedFile!: File;


  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0];
  }


  constructor(private productService: ProductService, private http: HttpClient) {
    this.product = {
      id: '',
      width: 0,
      lenght: 0,
      price: 0,
      description:'',
      image: '' as unknown as Blob,
    };
    this.message="";
   }

  ngOnInit(): void {

  }
  onSubmit(): void {
    const formData = new FormData();
    formData.append('width', this.product.width.toString());
    formData.append('lenght', this.product.lenght.toString());
    formData.append('price', this.product.price.toString());
    formData.append('file', this.selectedFile);

    this.http.post<IPainting>('http://localhost:5001/api/Painting', formData)
      .subscribe(
        response => {
          console.log('Success:', response);
          // Lógica adicional aqui, se necessário
        },
        error => {
          console.error('Error:', error);
          // Lógica adicional de tratamento de erro aqui, se necessário
        }
      );
  }
  

}

