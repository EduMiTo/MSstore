import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPainting } from '../interface/IPainting';
import { environment } from '../../environments/environment';
import { ISecundaryImages } from '../interface/isecundary-images';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: any[] = [];
  PaintingURL = environment.url.armazem + 'api/Painting';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<IPainting[]>(this.PaintingURL + '/listAll');

  }

  getImagesByProductId(Painting: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: Painting,
      },
    };
    return this.http.get<ISecundaryImages[]>(this.PaintingURL + '/GetImagesByPaintingId', options);

  }

  getSecundaryImagesByPaintingId(paintingId: string): Observable<any> {
   /* const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: paintingId,
      },
    };*/
    return this.http.get(`${this.PaintingURL}/${paintingId}/images`);
   // return this.http.get(this.PaintingURL+'/"'+paintingId+'"/images');
  }
  
  createPainting(formData: FormData){
    return this.http.post<IPainting>(this.PaintingURL, formData);
  }

  getProduct() {
    return this.products;
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.products));
  }

  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  loadCart(): void {
    this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  clearProducts() {
    localStorage.clear();
  }

  getData() {
    return this.http.get('/assets/config.json', {responseType: 'blob'});
  }
}
