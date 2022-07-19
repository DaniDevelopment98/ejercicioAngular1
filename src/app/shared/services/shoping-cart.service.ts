import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/product/interface/product.interface";
@Injectable({
    providedIn :'root' }
    )

    export class ShoppingCartService{
        products: Product[]=[];
        private cartSubjet=new BehaviorSubject<Product[]>([]);
        private totalSubjet=new BehaviorSubject<number>(0);
        private quantitySubjet=new BehaviorSubject<number>(0);

        get totalAction$(): Observable<number>{
            return this.totalSubjet.asObservable();
        }

        get cartAction$(): Observable<Product[]>{
            return this.cartSubjet.asObservable();
        }
        get CantiAction$(): Observable<number>{
            return this.quantitySubjet.asObservable();
        }


        updateCart(product:Product): void{
        this.addTOCart(product);
        this.calcTotal();
        this.cantProd();
        }
        resetCart():void{
            this.cartSubjet.next([]);
            this.totalSubjet.next(0);
            this.quantitySubjet.next(0);
            this.products=[];
         }

        private addTOCart(product:Product): void{
       
        const isProductInCart= this.products.find(({id})=> id == product.id)
        if (isProductInCart){
            isProductInCart.qty+=1;
            }else{
                this.products.push({... product,qty:1})
            }

        
        this.cartSubjet.next(this.products)
        }
        private cantProd(): void{
        const canti=this.products.reduce((acc,prod) => acc += prod.qty,0);
        this.quantitySubjet.next(canti);
        }
    
        private calcTotal(): void{
                    const total=this.products.reduce((acc,prod) => acc += (prod.price * prod.qty),0);
                    this.totalSubjet.next(total);
                }
    }

