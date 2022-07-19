export interface details{
    productID:number;
    productName:string;
    quantity:number;
}

export interface Orders{
    name:string;
    shippingAddress:string;
    city:string;
    date:string;
    isDelivery:boolean;
    id:number;
}

export interface DetailsOrder{
    details:details[];
    orderId:number;

}