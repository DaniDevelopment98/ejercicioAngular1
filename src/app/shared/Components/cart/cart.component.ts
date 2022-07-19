import { Component } from "@angular/core";
import { ShoppingCartService } from '../../services/shoping-cart.service';
@Component({
    selector:'app-cart',
    template:`
     <ng-container *ngIf="{total:tot$ | async,quantity:canti$|async} as dataCart">
     <ng-container *ngIf="dataCart.total">
     <mat-icon>add_shopping_cart</mat-icon>
     {{dataCart.total|currency}}
     ({{dataCart.quantity}} Producto)
     </ng-container>
     </ng-container>    
    `

})
export class CartComponent{
    canti$=this.shoppingCatSvc.CantiAction$;
  tot$=this.shoppingCatSvc.totalAction$;
  cart$=this.shoppingCatSvc.cartAction$;

  constructor(private shoppingCatSvc:ShoppingCartService ){
  

}
}
