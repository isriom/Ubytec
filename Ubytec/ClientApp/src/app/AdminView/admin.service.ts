import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IconType} from "@angular/material/icon/testing";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  api = "https://localhost:7183/api/";
  http: HttpClient;
  informe: ConsolidadoVenta[][] = []
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  private BASE_URL: string | URL = "";


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public _modal: NgbModal) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }

  getConsolidadoVentas() {
    const res = this.http.get<ConsolidadoVenta[][]>(this.api +"Admin/"+ "ConsolidadoVentas/list", {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      this.informe = result;
      console.log(this.informe);
    }, error => {
      console.error(error)
    });
  }
}

export class ConsolidadoVenta {
  public Cliente: string = "";
  public Nombre: string = "";
  public Count: number = 0;
  public Repartidor: string = "";
  public Precio: number = 0;


  constructor(Cliente: string, Nombre: string, Count: number, Repartidor: string, Precio: number) {
    this.Cliente = Cliente;
    this.Nombre = Nombre;
    this.Count = Count;
    this.Repartidor = Repartidor;
    this.Precio = Precio;
  }
}
