import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DetailsOrder, Orders } from "../interface/orders.interface";
import { Store } from "../interface/stores.interface";

@Injectable({
    providedIn: 'root'
})

export class DataService{
    private apiURL='http://localhost:1998';

    constructor(private http: HttpClient){}
        
    getStores():Observable<Store[]>{
            return this.http.get<Store[]>(`${this.apiURL}/stores`)
        }
 saveOrder(order:Orders ):Observable<Orders>   {
    return this.http.post<Orders>(`${this.apiURL}/orders`,order)
 }

 saveDetailOrder(details:DetailsOrder):Observable<DetailsOrder>{
    return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`,details)
 }

 

 
}