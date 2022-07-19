import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shoping-cart.service';
import { Product } from './product/interface/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
//Forma en lo que se traen los datos del api
products!:Product[];
  constructor(private productSvc:ProductsService,private shoppingCartSvc:ShoppingCartService) { }
  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(
      tap((products:Product[]) => this.products=products)  
    )
    .subscribe(); 
  }
  addToCart(product:Product):void{
this.shoppingCartSvc.updateCart(product)
}
  

}
