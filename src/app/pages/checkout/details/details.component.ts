import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shoping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
total$=this.shopingCartSvc.totalAction$;
cart$=this.shopingCartSvc.cartAction$;


  constructor(private shopingCartSvc:ShoppingCartService) { }

  ngOnInit(): void {
  }

}
