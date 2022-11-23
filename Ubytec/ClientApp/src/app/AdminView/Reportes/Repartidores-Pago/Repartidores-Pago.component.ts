import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminService, ConsolidadoVenta, RepartidoresPago} from "../../admin.service";

@Component({
  selector: 'app-Repartidores-Pago',
  templateUrl: './Repartidores-Pago.component.html',
  styleUrls: ['./Repartidores-Pago.component.css']
})
export class RepartidoresPagoComponent implements OnInit {
  displayedColumns: string[] = ["Nombre Afiliado", "Count", "Total", "Ganancia", "Pago"];
  data:RepartidoresPago[][] | null=[];
  constructor(public http: HttpClient, public Adminservice: AdminService) {
    this.data =Adminservice.getRepartidoresPago();
  }

  ngOnInit(): void {
  }

  totalContador(data: RepartidoresPago[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.Count;
    })
    return contador;
  }

  totalGanancia(data: RepartidoresPago[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.Ganancias;
    })
    return contador;
  }

  total(data: RepartidoresPago[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.Total;
    })
    return contador;
  }

  totalPago(data: RepartidoresPago[]) {
    var contador = 0;
    data.forEach((value) => {
      contador += value.Pago;
    })
    return contador;
  }
}
