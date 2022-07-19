import { Component } from '@angular/core';
import { ClientesService } from './Services/clientes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lista Clientes';

  constructor(
    private servicioCliente:ClientesService)
    {
      

    }
}
