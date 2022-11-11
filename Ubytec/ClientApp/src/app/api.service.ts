import {Inject, Injectable} from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class APIService {
  api = "http://localhost:7183/api/";
  http: HttpClient;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  carrito: producto[] = [new producto("pan", 800, 3, "https://via.placeholder.com/150"),
    new producto("Jamon", 550, 2, "https://via.placeholder.com/150"),
    new producto("Huevos", 300, 3, "https://via.placeholder.com/150")];
  total: number = 0;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
  }

  login(login: Login) {
    const res = this.http.put<string>("https://localhost:7274/api/Signin", login, {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      sessionStorage.setItem("Nombre", <string>(login.username));
      sessionStorage.setItem("Token", "True");
      sessionStorage.setItem("Rol", <string>login.role)
      window.location.reload()

    }, error => {
      console.error(error)
    });
    return this.http.put(this.api + "Sigin", login);
  }

  logout() {
    let res = this.http.put("https://localhost:7274/logout", JSON.stringify({}), {
      headers: this.httpOptions.headers,
      withCredentials: true,
      observe: "response"
    })
    res.subscribe(result => {
      console.log(result);
      sessionStorage.clear();
      window.location.reload()
    }, error => console.error(error));
  }

  getCarrito() {
    return this.carrito;
  }

  addCarrito(producto: producto) {
    this.carrito.push(producto);
  }

  removeCarrito(producto: producto) {
    this.carrito.splice(this.carrito.indexOf(producto), 1);
  }

  increase(producto: producto) {
    producto.cantidad++;
    this.updateTotal();
  }

  decrease(producto: producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      this.removeCarrito(producto);
    }
    this.updateTotal();

  }

  updateTotal() {
    this.total = 0;
    for (const carritoKey in this.carrito) {
      this.total += this.carrito[carritoKey].cantidad * <number>this.carrito[carritoKey][`precio`];
    }
    return this.total;
  }

}

export class Login {
  username: string | undefined;
  password: string | undefined;
  role: string | undefined;
}

export class producto {
  nombre: string | undefined;
  precio: number | undefined;
  cantidad: number = 1;
  imagen: string | undefined;

  constructor(nombre: string | undefined = "", precio: number | undefined = 0, cantidad: number = 0, imagen: string | undefined = "") {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.imagen = imagen;
  }

}
