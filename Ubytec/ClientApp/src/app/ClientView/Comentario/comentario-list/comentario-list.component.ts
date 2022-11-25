import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { APIService, product } from "../../api.service";
import { Comentario } from '../comentario';
import { ComentarioService } from '../comentario.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-comentario-list',
  templateUrl: './comentario-list.component.html',
  styleUrls: ['./comentario-list.component.css']
})
export class ComentarioListComponent implements OnInit {
  pageTitle = 'Comentarios';
  filteredComentarios: Comentario[] = [];
  comentarios: Comentario[] = [];
  errorMessage = '';

  api = "https://localhost:7183/api/";
  http: HttpClient;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  private BASE_URL: string | URL = "";

  order: Order[] = []

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredComentarios = this.listFilter ? this.performFilter(this.listFilter) : this.comentarios;
  }

  constructor(private comentarioService: ComentarioService, http: HttpClient, @Inject('BASE_URL') baseUrl: string, public _modal: NgbModal) {
    this.http = http;
    this.BASE_URL = baseUrl;
  }

  getOrders() {
    const res = this.http.get<Order[]>(this.api + "Client/Pedidos/list/En camino", {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      console.log(result)
      this.order = result
    }, error => {
      console.error(error)
    });

    //const res = this.http.get<Order[]>(this.api + "Client/Pedidos/list/Entregado", {
     // headers: this.httpOptions.headers,
    //  withCredentials: true,
    //});
    //res.subscribe(result => {
     // console.log(result)
     // this.order = result
    //}, error => {
      //console.error(error)
    //});
 
  }

  getProductosPedido(order: Order) {
    const res = this.http.get<ProductoPedido[]>(this.api + "Afiliado/ProductosPedido/list/" + order.ComprobantePago, {
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

  performFilter(filterBy: string): Comentario[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.comentarios.filter((comentario: Comentario) =>
      comentario.CedulaJafiliado.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.getComentarioData();
  }

  getComentarioData() {
    this.comentarioService.getComentarios()
      .subscribe({
        next: (comentarios) => {
          this.comentarios = comentarios;
          this.filteredComentarios = comentarios;
        },
        error: (err) => this.errorMessage = <any>err,
        complete: () => console.info('Obteniendo Lista de comentarios')
      });
  }

  deleteComentario(id: string, cedulaJAfiliado: string): void {
    if (id == '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Confirme que desea eliminar este comentario: ${cedulaJAfiliado}?`)) {
        this.comentarioService.deleteComentario(id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => this.errorMessage = <any>err,
            complete: () => console.info('Eliminar comentario de la lista')
          });
      }
    }
  }

  onSaveComplete(): void {
    this.comentarioService.getComentarios()
      .subscribe({
        next: (comentarios) => {
          this.comentarios = comentarios;
          this.filteredComentarios = comentarios;
        },
        error: (err) => this.errorMessage = <any>err,
        complete: () => console.info('Obteniendo comentarios de la lista')
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
