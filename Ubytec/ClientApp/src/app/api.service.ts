import {Inject, Injectable} from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";

declare global {
}

@Injectable({
  providedIn: 'root'
})

export class APIService {
  api = "https://localhost:7183/api/";
  http: HttpClient;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  carrito: product[] = [new product("pan", 800,  "https://via.placeholder.com/150"),
    new product("Jamon", 550,  "https://via.placeholder.com/150"),
    new product("Huevos", 300,  "https://via.placeholder.com/150")]

  total: number = 0;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
  }

  login(login: Login) {
    const res = this.http.put<string>(this.api + "Signin", JSON.stringify( login), {
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
    let res = this.http.put(this.api + "/logout", JSON.stringify({}), {
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

  addCarrito(product: product) {
    this.carrito.push(product);
  }

  removeCarrito(product: product) {
    this.carrito.splice(this.carrito.indexOf(product), 1);
  }

  increase(product: product) {
    product.amount++;
    this.updateTotal();
  }

  decrease(product: product) {
    if (product.amount > 1) {
      product.amount--;
    } else {
      this.removeCarrito(product);
    }
    this.updateTotal();

  }

  updateTotal() {
    this.total = 0;
    for (const carritoKey in this.carrito) {
      this.total += this.carrito[carritoKey].amount * <number>this.carrito[carritoKey][`price`];
    }
    return this.total;
  }

}

export class Login {
  username: string | undefined;
  password: string | undefined;
  role: string | undefined;
}

export class product {
  name: string | undefined;
  price: number | undefined;
  amount: number = 1;
  image: string | undefined;

  constructor(nombre: string | undefined = "",
              price: number | undefined = 0,
              image: string | undefined = "",
              amount: number = 1) {
    this.name = nombre;
    this.price = price;
    this.amount = amount;
    this.image = image;
  }

}


