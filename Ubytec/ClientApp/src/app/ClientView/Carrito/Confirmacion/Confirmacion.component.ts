import {Component, OnInit, ViewChildren} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIService, Order} from "../../../api.service";
import {Md5} from "ts-md5";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-ConfirmacionComponent',
  templateUrl: './Confirmacion.component.html',
  styleUrls: ['./Confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {
  total: number = 0;

  @ViewChildren('tarjeta') tarjeta!: HTMLInputElement;
  @ViewChildren('CSV') CSV!: HTMLInputElement;
  @ViewChildren('adr') Adr!: HTMLInputElement;
  order = new FormGroup({
    tarjeta: new FormControl(),
    csv: new FormControl(),
    adr: new FormControl(),
  })

  constructor(public http: HttpClient, private service: APIService) {
    console.log("modal creado")
    this.total = Number((this.service.updateTotal() * 1.13).toFixed(2));
  }

  ngOnInit(): void {
  }

  Confirmacion() {
    var tmporder: Order = new Order(Md5.hashAsciiStr(<string>(this.tarjeta?.value) + Date.now().toLocaleString()).toString(), this.order.controls.adr.value, this.service);
    this.service.confirmar(tmporder);
  }
}
