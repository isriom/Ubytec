import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIService} from "../../../ClientView/api.service";
import {AdminService, ConsolidadoVenta, VentasAfiliado} from "../../admin.service";

@Component({
  selector: 'app-Ventas-Afiliado',
  templateUrl: './Ventas-Afiliado.component.html',
  styleUrls: ['./Ventas-Afiliado.component.css']
})
export class VentasAfiliadoComponent implements OnInit {
  displayedColumns: string[] = [ "Count", "Total", "Ganancia"];
  data: VentasAfiliado[][] | null = [];
  constructor(public http: HttpClient, public Adminservice: AdminService) {
    this.data=Adminservice.getVentasAfiliado();
  }

  ngOnInit(): void {
  }

  totalCompras(data: VentasAfiliado[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.Compras;
    })
    return contador;
  }

  totalServicio(data: VentasAfiliado[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.MontoServicio;
    })
    return contador;
  }

  total(data: VentasAfiliado[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.Sum;
    })
    return contador;
  }
}
