import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIService} from "../../../ClientView/api.service";
import {AdminService, ConsolidadoVenta} from "../../admin.service";

@Component({
  selector: 'app-consolidado-ventas',
  templateUrl: './consolidado-ventas.component.html',
  styleUrls: ['./consolidado-ventas.component.css']
})
export class ConsolidadoVentasComponent implements OnInit {
  displayedColumns: string[] = ["Nombre Afiliado", "Count", "Repartidor", "Precio",];

  constructor(public http: HttpClient, public Adminservice: AdminService) {
    Adminservice.getConsolidadoVentas();
  }

  ngOnInit(): void {
  }

  totalContador(data: ConsolidadoVenta[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.Count;
    })
    return contador;
  }

  totalPrecio(data: ConsolidadoVenta[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.Precio;
    })
    return contador;
  }
}
