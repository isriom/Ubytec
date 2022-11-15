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


  increment(producto: product) {
    this.service.increase(producto);
    this.total = this.service.updateTotal()

  }

  decrease(producto: product) {
    this.service.decrease(producto);
    this.total = this.service.updateTotal()

  }
}
