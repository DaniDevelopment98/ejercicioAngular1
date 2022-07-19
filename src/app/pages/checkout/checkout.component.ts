import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { details, Orders } from 'src/app/shared/interface/orders.interface';
import { Store } from 'src/app/shared/interface/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shoping-cart.service';
import { Product } from '../products/product/interface/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model={
    name:'',
    store:'',
    shippingAddress:'',
    city:'',

  };
  isDelivery=true;
  cart:Product[]=[]
  stores:Store[]=[]
  constructor(private dataSvc:DataService, 
    private shopinCartSvc:ShoppingCartService,
    private router:Router,
    private producsSvc:ProductsService
    ) { 
      this.checkIfCartIsEmpty();
    }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }
  onPickupOrDelivery(value:boolean) :void{
this.isDelivery=value;
  }

  Onsubmit({value: formData}: NgForm):void{

    const data:Orders={
      ... formData,
      date:this.getData(),
      isDelivery:this.isDelivery
    }

    this.dataSvc.saveOrder(data).
    pipe(
      tap(res => console.log('Order =>',res) ),
      switchMap(({id:orderId}) =>{       
        const details=this.prepareDetails();

      return this.dataSvc.saveDetailOrder({details,orderId});
      }),
    tap(()=> this.router.navigate(['/checkout/thank-you-page']) ),
    delay(2000),
    tap(()=>this.shopinCartSvc.resetCart())
    )
    .subscribe();
  }


  private getStores():void{
    this.dataSvc.getStores()
    .pipe(
      tap (( stores: Store[] ) => this.stores=stores))
    .subscribe()
  }

  private getData(): string{
return new  Date().toLocaleDateString();
  }

  private prepareDetails(): details[]{
    const det:details[]=[];
    this.cart.forEach((product:Product) => {
     const {id:productID, name:productName, qty:quantity, stock} = product;     
     const updateStock=(stock-quantity);
      this.producsSvc.updateStock(productID,updateStock)
      .pipe(
        tap(()=> det.push({productID,productName,quantity}))
      )
      .subscribe();
     
    })
    return det;
  }

  private getDataCart(): void{
    this.shopinCartSvc.cartAction$.pipe(
      tap((products:Product[])=>this.cart=products)
    )
    .subscribe();
  }

  private checkIfCartIsEmpty():void{
    this.shopinCartSvc.cartAction$
    .pipe(
      tap((products:Product[])=>{
        if(Array.isArray(products)&& !products.length){
          this.router.navigate(['/products']);
        }
      })
    )    
    .subscribe()
  
  }
}
