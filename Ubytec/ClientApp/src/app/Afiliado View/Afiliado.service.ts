import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {APIService, product} from "../ClientView/api.service";

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {
  api = "https://ubytec.azurewebsites.net//api/";
  http: HttpClient;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  private BASE_URL: string | URL = "";

  order: Order[][] = []

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public _modal: NgbModal) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }


  getOrders(): Order[] {
    const res = this.http.get<Order[][]>(this.api + "Afiliado/Pedidos/list", {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      console.log(result)
      result.forEach(value => {
        value.forEach(value1 => {
          this.getProductosPedido(value1)
        })
      })
      this.order = result
      return result
    }, error => {
      console.error(error)
    });
    return []
  }

  getProductosPedido(order: Order) {
    const res = this.http.get<ProductoPedido[]>(this.api + "Afiliado/ProductosPedido/list/"+order.ComprobantePago, {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      console.log(result)
      order.Products = result
      return result
    }, error => {
      console.error(error)
    });
    return []
  }

  async AssignRepartidor(order: Order) {
    const res = this.http.put<Order>(this.api + "Afiliado/Repartidor/Asignar/" + order.ComprobantePago, JSON.stringify(order), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    await res.subscribe(result => {
      this.getOrders();
      console.log(result)
      return result

    }, error => {
      console.error(error)
      this.getOrders();
    });
  }
}

export class ProductoPedido {
  public ComprobantePago: string = ""
  public NombreProducto: string = ""
  public CedulaJafiliado: string = ""
  public Cantidad: string = ""
}

export class Order {
  ComprobantePago: string = null!;
  Dirreccion: string = null!;
  CedulaJafiliado: string = null!;
  Products: ProductoPedido[] = [];
  EstadoPedido: string = "";
  Id: number = 0;

  constructor(ComprobantePago: string, Dirreccion: string) {
    this.ComprobantePago = ComprobantePago;
    this.Dirreccion = Dirreccion;
  }
}

