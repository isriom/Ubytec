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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  private BASE_URL: string | URL = "";

  dataVentasAfiliado: VentasAfiliado[][] = [];
  dataRepartidoresPago: RepartidoresPago[][] = [];
  dataConsolidadoVentas: ConsolidadoVenta[][] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public _modal: NgbModal) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }

  getConsolidadoVentas(): ConsolidadoVenta[][] | null {
    const res = this.http.get<ConsolidadoVenta[][]>(this.api + "Admin/" + "ConsolidadoVentas/list", {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      var informe: ConsolidadoVenta[][] = result;
      console.log(informe);
      this.dataConsolidadoVentas = informe;
      return informe;
    }, error => {
      console.error(error)
    });
    return null;
  }

  getRepartidoresPago(): RepartidoresPago[][] | null {
    const res = this.http.get<RepartidoresPago[][]>(this.api + "Admin/" + "ReporteRepartidor/list", {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      var informe: RepartidoresPago[][] = result;
      console.log(informe);
      this.dataRepartidoresPago = informe;
      return informe;
    }, error => {
      console.error(error)
    });
    return null;
  }

  getVentasAfiliado(): VentasAfiliado[][] | null {
    const res = this.http.get<VentasAfiliado[][]>(this.api + "Admin/" + "VentasAfiliado/list", {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      var informe: VentasAfiliado[][] = result;
      console.log(informe);
      this.dataVentasAfiliado = informe;
      return informe;
    }, error => {
      console.error(error)
    });
    return null;
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

export class RepartidoresPago {
  public Repartidor: string = "";
  public Afiliado: string = "";
  public Count: number = 0;
  public Total: number = 0;
  public Ganancias: number = 0;
  public Pago: number = 0;

  constructor(Repartidor: string, Afiliado: string, Count: number, Total: number, Ganancias: number, Pago: number) {
    this.Repartidor = Repartidor;
    this.Afiliado = Afiliado;
    this.Count = Count;
    this.Total = Total;
    this.Ganancias = Ganancias;
    this.Pago = Pago;
  }
}

export class VentasAfiliado {

  public Afiliado: string = "";
  public Compras: number = 0;
  public Sum: number = 0;
  public MontoServicio: number = 0;

  constructor(Afiliado: string, Compras: number, Sum: number, MontoServicio: number) {
    this.Afiliado = Afiliado;
    this.Compras = Compras;
    this.Sum = Sum;
    this.MontoServicio = MontoServicio;
  }
}
