import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AfiliadoService, Order} from "../Afiliado.service";
import {APIService, } from "../../ClientView/api.service";

@Component({
  selector: 'app-AsignarRepartidor',
  templateUrl: './AsignarRepartidor.component.html',
  styleUrls: ['./AsignarRepartidor.component.css']
})
export class AsignarRepartidorComponent implements OnInit {
  displayedColumns: string[] = ["Nombre Afiliado", "Count", "Repartidor", "Precio",];
  data: Order[] ;

  constructor(public http: HttpClient, public AfiliadoService: AfiliadoService) {
    this.data = AfiliadoService.getOrders();
    console.log(this.data)
  }

  ngOnInit(): void {
    this.data = this.AfiliadoService.getOrders();
    console.log(this.data)
  }

  assign(data: Order) {
    this.AfiliadoService.AssignRepartidor(data);
  }
}
