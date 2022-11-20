import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmacionComponent} from "./Carrito/Confirmacion/Confirmacion.component";

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
  carrito: product[] = [new product("pan", 800, "https://via.placeholder.com/150"),
    new product("Jamon", 550, "https://via.placeholder.com/150"),
    new product("Huevos", 300, "https://via.placeholder.com/150")]

  total: number = 0;
  actualEditor: NgbModalRef | undefined;
  juridicNo: string = "";

  Afiliados: afiliate[] = [];
  SelectedAfiliate: afiliate = new afiliate();

  private BASE_URL: string | URL = "";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public _modal: NgbModal) {
    this.http = http;
    this.BASE_URL = baseUrl;
    if (localStorage.getItem("shoppingCart") != null) {
      this.carrito = JSON.parse(<string>localStorage.getItem("shoppingCart"));
    }
    if (localStorage.getItem("SelectedAfiliate") != null) {
      this.SelectedAfiliate = JSON.parse(<string>localStorage.getItem("SelectedAfiliate"));
    }
  }

  login(login: Login) {
    const res = this.http.put<string>(this.api + "Signin", JSON.stringify(login), {
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
    this.updateTotal();

  }

  removeCarrito(product: product) {
    this.carrito.splice(this.carrito.indexOf(product), 1);
    this.updateTotal();

  }

  increase(product: product) {
    product.amount++;
    console.log("increase")
    console.log(product)
    this.updateTotal();
    console.log("increase second part")
  }

  decrease(product: product) {
    if (product.amount > 1) {
      product.amount--;
    } else {
      this.removeCarrito(product);
    }
    this.updateTotal();

  }

  public updateTotal() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.carrito));
    console.log("update")
    this.total = 0;
    this.carrito.forEach(value => this.total += value.amount * value.price)
    return this.total;
  }

  public comprar() {

    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    this.actualEditor = this._modal.open(ConfirmacionComponent, {animation: true, size: 'sm'});
  }

  /**
   * Confirm a order
   * @param Order
   * clears the shopping cart and redirects to the home page
   */
  public async confirmar(Order: Order) {
    this.actualEditor?.close()
    console.log(Order)
    const res = this.http.put<string>(this.api + "Client/buy/add", JSON.stringify(Order), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    await res.subscribe(result => {
      this.juridicNo = "";
      this.carrito = []
      this.total = 0;
    })

    window.location.assign(this.BASE_URL)
  }

  /**
   * Afiliates are loaded from the database and saved to the local variable: services.afiliados
   */
  async getAfiliados() {
    const res = this.http.get<string>(this.api + "Client/Afiliados/list", {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    await res.subscribe(result => {
      this.Afiliados = <afiliate[]><unknown>(result);
    }, error => {
      console.error(error)
    });

  }

  /**
   *
   * @param afiliate
   * @constructor
   * Sets the selected afiliate and saves it to local storage; In case of change od afiliate, the shopping cart is cleared. redirect to the shop.
   */
  async SelectAfiliate(afiliate: afiliate) {
    if (this.SelectedAfiliate.CedulaJuridica != afiliate.CedulaJuridica) {
      localStorage.removeItem("shoppingCart");
    }
    this.SelectedAfiliate = afiliate;
    await this.getAfiliateProducts(this.SelectedAfiliate);
    await this.SelectedAfiliate.Productos.forEach((value => {
      this.getProductimage(value);
    }))
    localStorage.setItem("SelectedAfiliate", JSON.stringify(afiliate));
    window.location.assign(this.BASE_URL + "Cliente/Tienda")
  }

  /**
   * Ask the server for the products of the selected afiliate
   * @param afiliate
   */
  async getAfiliateProducts(afiliate: afiliate) {
    const res = this.http.get<string>(this.api + "Client/Afiliados/list/" + afiliate.Nombre, {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    await res.subscribe(result => {
      var products: afiliateproduct[] = <afiliateproduct[]><unknown>(result);
      products.forEach((value => {
        this.getProductimage(value)
      }))
      afiliate.Productos = products;

      return products;
    }, error => {
      console.error(error)
    });
  }

  /**
   * Ask the server for the image of a product
   * @param product
   */
  async getProductimage(product: afiliateproduct) {
    const res = this.http.get<string>(this.api + "Client/Afiliados/list/" + this.SelectedAfiliate?.Nombre + "/" + product.NombreProducto, {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    await res.subscribe(result => {
      console.log(result)
      product.FotosProductos = <string[]><unknown>(result);
    }, error => {
      console.error(error)
    });
  }


}

/**
 * This class is used to store the information of a init seccion
 */
export class Login {
  username: string | undefined;
  password: string | undefined;
  role: string | undefined;
}

/**
 * This class is used to store the information of a product, used in the shopping cart
 */
export class product {
  name: string | undefined;
  price: number = 0;
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

/**
 * This class is used to store the information of a Order
 */
export class Order {
  ComprobantePago: string = null!;
  Dirreccion: string = null!;
  CedulaJafiliado: string = null!;
  Products: product[] = [];

  constructor(ComprobantePago: string, Dirreccion: string, service: APIService) {
    this.ComprobantePago = ComprobantePago;
    this.Dirreccion = Dirreccion;
    this.CedulaJafiliado = service.SelectedAfiliate.CedulaJuridica;
    this.Products = service.carrito;
  }
}

/**
 * This class is used to store the information of a product of an afiliate, used in the shop
 */
export class afiliateproduct {

  public NombreProducto: string = "";
  public CedulaJafiliado: string = "";
  public Categoria: string = ""
  public Precio: number = 0
  public FotosProductos: string[] = [];


}

/**
 * This class is used to store the information of an afiliate
 */
export class afiliate {
  public Nombre: string = "";
  public CedulaJuridica: string = "";
  public Distrito: string = "";
  public Provincia: string = "";
  public Canton: string = "";
  public Sinpe: string = "";
  public Correo: string = "";
  public Estado: string = "";
  public Productos: afiliateproduct[] = [];


}

