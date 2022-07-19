import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  //Decoradores
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(private router: Router){

}  
GoToCheckOut():void{
  this.router.navigate(['/checkout'])
 }

}
