import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {APIService, producto} from "../api.service";


@Component({
  selector: 'app-CarritoComponent',
  templateUrl: './Carrito.component.html',
  styleUrls: ['./Carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: producto[] = []
  total: number = 0;


  constructor(public http: HttpClient, private service: APIService) {
    console.log("modal creado")
    this.updateCarrito()
  }

  ngOnInit(): void {
  }

  updateCarrito() {
    this.carrito = this.service.getCarrito();
    this.total = this.service.updateTotal()

  }


  increment(producto: producto) {
    this.service.increase(producto);
    this.total = this.service.updateTotal()

  }

  decrease(producto: producto) {
    this.service.decrease(producto);
    this.total = this.service.updateTotal()

  }
}
