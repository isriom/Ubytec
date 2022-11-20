import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIService, product} from "../api.service";


@Component({
  selector: 'app-CarritoComponent',
  templateUrl: './Carrito.component.html',
  styleUrls: ['./Carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: product[] = []


  constructor(public http: HttpClient, public service: APIService) {
    console.log("modal creado")
    this.updateCarrito()
  }

  ngOnInit(): void {
  }

  updateCarrito() {
    this.carrito = this.service.getCarrito();
    this.service.updateTotal()
  }


  increment(producto: product) {
    this.service.increase(producto);
  }

  decrease(producto: product) {
    this.service.decrease(producto);
  }

  comprar() {
    this.service.comprar();
  }

  impuestos(price: number) {
  return (price * 0.13).toFixed(2)
  }

  neto(total: number) {
  return (total * 1.13).toFixed(2)
  }
}
