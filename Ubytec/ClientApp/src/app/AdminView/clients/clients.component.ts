import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
//import { Popup } from "../Popup/Popup.component";

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']

})
/**
 * Clase donde se desarrolla las funcionalidades de la pagina de Cliente en la vista Cliente
 */
export class ClientsComponent {
  opC = sessionStorage.getItem("operacionCliente");
  token = sessionStorage.getItem("tokenKey");
  user = sessionStorage.getItem("Nombre")
  respuesta = {};
  Cliente: cliente = new cliente("", "", "", "", "", "", "", "", "", "");
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
    this.opC = '0'
    this.http = http;
    this.baseurl = baseUrl;
    //this.Obtener_Clientes();
  }

  /**
   * Metodo que el cual direcciona a la pagina de clientes al ser solicitada en la barra de menu
   * @constructor metodo relacionado
   */
  async Obtener_Clientes() {
    var res = await this.http.get<string>("https://localhost:7143/GClientes/plantilla", {
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
  async Add_Button() {
    this.opC ='1'
    

  }
  async Get_Client() {
    const answer = {
      Cedula: (<HTMLInputElement>document.getElementById("Cedula")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.get<cliente>("https://localhost:7183/api/Client/Cliente/list/" + answer.Cedula, {
      headers: this.httpOptions.headers,
      withCredentials: true,
    }
    )
    res.subscribe(result => {
      console.log(this.Cliente);
      this.Cliente = result;
      console.log(this.Cliente);

      // Asignar los valores de la consulta indicada
      (<HTMLInputElement>document.getElementById("Nombre")).value = this.Cliente.Nombre;
      (<HTMLInputElement>document.getElementById("Apellidos")).value = this.Cliente.Apellidos;
      (<HTMLInputElement>document.getElementById("Distrito")).value = this.Cliente.Distrito;
      (<HTMLInputElement>document.getElementById("Provincia")).value = this.Cliente.Provincia;
      (<HTMLInputElement>document.getElementById("Canton")).value = this.Cliente.Canton;
      (<HTMLInputElement>document.getElementById("Usuario")).value = this.Cliente.Usuario;
      (<HTMLInputElement>document.getElementById("Contraseña")).value = this.Cliente.Contraseña;
      (<HTMLInputElement>document.getElementById("FechaNacimiento")).value = this.Cliente.FechaNacimiento;
      (<HTMLInputElement>document.getElementById("Correo")).value = this.Cliente.Correo;
    }, error => console.error(error));
    console.log(res)

  }
  async Delete_Button2() {

    const Cedula = (<HTMLInputElement>document.getElementById("CedulaD")).value;

    const key: string[] = [Cedula];
    console.log(key)
    console.log("Cuenta eliminada: " + (key[0]))
    let res = await this.http.delete("https://localhost:7183/api/Client/Cliente/delete", {
      headers: this.httpOptions.headers,
      withCredentials: true, body: key
    }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));

  }
  async Edit_Button2() {
    const answer: cliente = {
      Nombre: (<HTMLInputElement>document.getElementById("Nombre")).value,
      Apellidos: (<HTMLInputElement>document.getElementById("Apellidos")).value,
      Cedula: (<HTMLInputElement>document.getElementById("Cedula")).value,
      Distrito: (<HTMLInputElement>document.getElementById("Distrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("Provincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("Canton")).value,
      Usuario: (<HTMLInputElement>document.getElementById("Usuario")).value,
      Contraseña: (<HTMLInputElement>document.getElementById("Contraseña")).value,
      FechaNacimiento: (<HTMLInputElement>document.getElementById("FechaNacimiento")).value,
      Correo: (<HTMLInputElement>document.getElementById("Correo")).value
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.post("https://localhost:7183/api/Client/Cliente/update", JSON.stringify(answer), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    })
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)

  }

  /**
   * Metodo donde se define la funcion del boton DELETE
   * @constructor
   */
  async Delete_Button() {
    this.opC = '2'
  }
  async Edit_Button() {
    this.opC = '1'
  }
}

export class cliente {
  public Nombre: string = ""
  public Apellidos: string = ""
  public Cedula: string = ""
  public Distrito: string = ""
  public Provincia: string = ""
  public Canton: string = ""
  public Usuario: string = ""
  public Contraseña: string = "";
  public FechaNacimiento: string = "";
  public Correo: string = ""


  constructor(Nombre: string, Apellidos: string, Cedula: string, Distrito: string, Provincia: string, Canton: string, Usuario: string, Contraseña: string, FechaNacimiento: string, Correo: string) {
    this.Nombre = Nombre;
    this.Apellidos = Apellidos;
    this.Cedula = Cedula;
    this.Distrito = Distrito;
    this.Provincia = Provincia;
    this.Canton = Canton;
    this.Usuario = Usuario;
    this.Contraseña = Contraseña;
    this.FechaNacimiento = FechaNacimiento;
    this.Correo = Correo;
  }
}

export class telefonoC {
  public CedulaCliente: string = "";
  public Telefono: string = "";

  constructor(CedulaCliente: string, Telefono: string) {
    this.Telefono = Telefono;
    this.CedulaCliente = CedulaCliente;
  }
}

