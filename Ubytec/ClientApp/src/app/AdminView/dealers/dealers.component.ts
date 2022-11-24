import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";

//import { Popup } from "../Popup/Popup.component";

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css']

})
/**
 * Clase donde se desarrolla las funcionalidades de la pagina de Cliente en la vista Cliente
 */
export class DealersComponent {
  op = sessionStorage.getItem("operacion");
  token = sessionStorage.getItem("tokenKey");
  respuesta = {};
  http: HttpClient;
  router: Router | undefined;
  baseurl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };

  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.op = '0';
    this.http = http;
    this.baseurl = baseUrl;
    //this.Obtener_Clientes();
  }

  /**
   * Metodo que el cual direcciona a la pagina de clientes al ser solicitada en la barra de menu
   * @constructor metodo relacionado
   */
  async Obtener_Clientes() {
    var res = await this.http.get<string>("https://localhost:7183/GClientes/plantilla", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo donde se definen las acciones a realizar al clickear el boton de ADD
   * @constructor metodo relacionado
   */
  async Add_Button2() {

    const answer: repartidor = {
      NombreCompleto: (<HTMLInputElement>document.getElementById("Nombre")).value,
      Cedula: (<HTMLInputElement>document.getElementById("Cedula")).value,
      Distrito: (<HTMLInputElement>document.getElementById("Distrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("Provincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("Canton")).value,
      Usuario: (<HTMLInputElement>document.getElementById("Usuario")).value,
      Contraseña: (<HTMLInputElement>document.getElementById("Contraseña")).value,
      Disponible: true,
      Correo: (<HTMLInputElement>document.getElementById("Correo")).value
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put<repartidor>("https://localhost:7183/api/Admin/Repartidor/add", JSON.stringify(answer), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    })
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)



  }

  async Add_Button() {
    this.op = '1'


  }

  /**
   * Metodo donde se define la funcion del boton DELETE
   * @constructor
   */
  async Delete_Button() {
    this.op = '2'
  }

  async Edit_Button() {
    this.op = '3'
  }

  async Edit_Button2() {
    const answer: repartidor = {
      NombreCompleto: (<HTMLInputElement>document.getElementById("NombreEditar")).value,
      Cedula: (<HTMLInputElement>document.getElementById("CedulaEditar")).value,
      Distrito: (<HTMLInputElement>document.getElementById("DistritoEditar")).value,
      Provincia: (<HTMLInputElement>document.getElementById("ProvinciaEditar")).value,
      Canton: (<HTMLInputElement>document.getElementById("CantonEditar")).value,
      Usuario: (<HTMLInputElement>document.getElementById("UsuarioEditar")).value,
      Contraseña: (<HTMLInputElement>document.getElementById("ContraseñaEditar")).value,
      Disponible: true,
      Correo: (<HTMLInputElement>document.getElementById("CorreoEditar")).value
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.post("https://localhost:7183/api/Admin/Repartidor/update", JSON.stringify(answer), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    })
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
    /*
    const answer = {
      Usuario: (<HTMLInputElement>document.getElementById("CedulaEditar")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/Repartidor/list", JSON.stringify(answer), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    }
    )
   
    const NombreCompleto = (<HTMLInputElement>document.getElementById("NombreEditar"))
    const Distrito = (<HTMLInputElement>document.getElementById("DistritoEditar"))
    const Provincia = (<HTMLInputElement>document.getElementById("ProvinciaEditar"))
    const Canton = (<HTMLInputElement>document.getElementById("CantonEditar"))
    const Usuario = (<HTMLInputElement>document.getElementById("UsuarioEditar"))
    const Contraseña = (<HTMLInputElement>document.getElementById("ContraseñaEditar"))
    const Disponible = (<HTMLInputElement>document.getElementById("DisponibleEditar"))
    const Correo = (<HTMLInputElement>document.getElementById("CorreoEditar"))

    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      // Parser result para obtener los datos
    }, error => console.error(error));
    console.log(res)

    // Asignar los valores de la consulta indicada
    NombreCompleto.value = "NombreCompleto";
    Distrito.value = "Distrito";
    Provincia.value = "Provincia";
    Canton.value = "Canton";
    Usuario.value = "Usuario"
    Contraseña.value = "Contraseña";
    Disponible.value = "Disponible"
    Correo.value = "Correo";
    */


  }
}

export class repartidor {
  public NombreCompleto: string = ""
  public Cedula: string = ""
  public Distrito: string = ""
  public Provincia: string = ""
  public Canton: string = ""
  public Usuario: string = ""
  public Contraseña: string = "";
  public Disponible: boolean = true;
  public Correo: string = ""


  constructor(NombreCompleto: string, Cedula: string, Distrito: string, Provincia: string, Canton: string, Usuario: string, Contraseña: string, Disponible: boolean, Correo: string) {
    this.NombreCompleto = NombreCompleto;
    this.Cedula = Cedula;
    this.Distrito = Distrito;
    this.Provincia = Provincia;
    this.Canton = Canton;
    this.Usuario = Usuario;
    this.Contraseña = Contraseña;
    this.Disponible = Disponible;
    this.Correo = Correo;
  }
}

