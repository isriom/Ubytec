import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {afiliate, afiliateproduct, APIService, product} from "../api.service";


@Component({
  selector: 'app-SeleccionAfiliadoComponent',
  templateUrl: './Afiliados.component.html',
  styleUrls: ['./Afiliados.component.css']
})
export class SeleccionAfiliadoComponent implements OnInit {
  afiliados: afiliate[] = [];

  constructor(public http: HttpClient, public service: APIService) {
    console.log("modal creado")
    this.loadAfiliate();
    console.log(this.afiliados)
    this.afiliados = this.service.Afiliados;
  }

  ngOnInit(): void {
    this.afiliados = this.service.Afiliados;
  }

  async loadAfiliate() {
    await this.service.getAfiliados();
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.afiliados = this.service.Afiliados;

  }
}
