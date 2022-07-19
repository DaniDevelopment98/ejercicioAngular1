import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private apiURL='http://localhost:1998/products';//iría la url del api real para hacer la conexion
  constructor(private http:HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get<Product[]>(this.apiURL);
}

updateStock(productId:number, stock:number):Observable<any>{
  const body={"stock":stock};
  return this.http.patch<any>(`${this.apiURL}/${productId}`,body)
}
}
