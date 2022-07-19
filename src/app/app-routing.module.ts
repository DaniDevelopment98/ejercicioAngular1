import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
   {path: '',redirectTo: '/products', pathMatch:'full'},
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },  
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
 
  
  /*Esto nos sirve para que nos dirija a la ruta principal, por lo tanto hay que dejarla por ultima, 
  así de esta manera se podrá acceder a las rutas en específicas, ya siempre se ejecuta por orden
  */
 {path: '**',redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
