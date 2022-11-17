import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {afiliate, afiliateproduct, APIService, product} from "../../api.service";


@Component({
  selector: 'app-TiendaComponent',
  templateUrl: './Tienda.component.html',
  styleUrls: ['./Tienda.component.css']
})
export class TiendaComponent implements OnInit {
  products: afiliateproduct[] | undefined = [];

  constructor(public http: HttpClient, public service: APIService) {
    console.log(service.SelectedAfiliate)
    this.loadAfiliate();
  }

  async loadAfiliate() {
    if (this.service.SelectedAfiliate != null) {
      await this.service.getAfiliateProducts(this.service.SelectedAfiliate);
      if (this.service.SelectedAfiliate.Productos != null) {
        this.products = this.service.SelectedAfiliate.Productos;
      }
    }
  }

  ngOnInit(): void {
  }

  addCart(producto: afiliateproduct) {

    var exist = false;
    this.service.carrito.forEach(item => {
      if (item.name == producto.NombreProducto) {
        console.log(item)
        this.service.increase(item);
        exist = true;
        return
      }
    });
    if (exist) {
      return
    }
    this.service.addCarrito(new product(producto.NombreProducto, producto.Precio, producto.FotosProductos[0]));
  }

  nothing() {

  }
}
