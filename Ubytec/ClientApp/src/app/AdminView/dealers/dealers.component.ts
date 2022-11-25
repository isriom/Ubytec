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
  Repartidor: repartidor = new repartidor("", "", "", "", "", "", "", true, "");
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  allRepatidores: repartidor[] = [];
  allRepartidoresnames: string[] = [];

  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.op = '0';
    this.http = http;
    this.baseurl = baseUrl;
    this.get_all_repartidores();
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
  async AddTel_Button() {

    const answer: telefonoR = {
      CedulaRepartidor: (<HTMLInputElement>document.getElementById("Cedula")).value,
      Telefono: (<HTMLInputElement>document.getElementById("Telefono")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/TelefonoR/add", JSON.stringify(answer), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
    //Clear
    const tel = (<HTMLInputElement>document.getElementById("Telefono"))
    tel.value = "";
  }

  /**
   * Metodo donde se define la funcion del boton DELETE
   * @constructor
   */
  async Delete_Button() {
    this.op = '2'
  }

  async Delete_Button2() {

    const Cedula = (<HTMLInputElement>document.getElementById("CedulaEliminar")).value;

    const key: string[] = [Cedula];
    console.log(key)
    console.log("Repartidor eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7183/api/Admin/Repartidor/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));

  }
  async DeleteTel_Button() {
    const CedulaRepartidor = (<HTMLInputElement>document.getElementById("CedulaEliminar")).value;
    const Telefono = (<HTMLInputElement>document.getElementById("TelefonoEliminar")).value;

    const key: string[] = [CedulaRepartidor, Telefono];
    console.log(key)
    console.log("Telefono eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7183/api/Admin/TelefonoR/delete", {
      headers: this.httpOptions.headers,
      withCredentials: true, body: key
    }
    )

    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      

    }, error => console.error(error)); 
  
}

  async Edit_Button() {
    this.op = '3'
  }

  async Get_Button() {
    const answer = {
      Cedula: (<HTMLInputElement>document.getElementById("CedulaEditar")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.get<repartidor>("https://localhost:7183/api/Admin/Repartidor/list/" + answer.Cedula, {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      console.log(this.Repartidor);
      this.Repartidor = result;
      console.log(this.Repartidor);

      // Asignar los valores de la consulta indicada
      (<HTMLInputElement>document.getElementById("NombreEditar")).value = this.Repartidor.NombreCompleto;
      (<HTMLInputElement>document.getElementById("DistritoEditar")).value = this.Repartidor.Distrito;
      (<HTMLInputElement>document.getElementById("ProvinciaEditar")).value = this.Repartidor.Provincia;
      (<HTMLInputElement>document.getElementById("CantonEditar")).value = this.Repartidor.Canton;
      (<HTMLInputElement>document.getElementById("UsuarioEditar")).value = this.Repartidor.Usuario;
      (<HTMLInputElement>document.getElementById("ContraseñaEditar")).value = this.Repartidor.Contraseña;
      (<HTMLInputElement>document.getElementById("DisponibleEditar")).checked = this.Repartidor.Disponible;
      (<HTMLInputElement>document.getElementById("CorreoEditar")).value = this.Repartidor.Correo;
    }, error => console.error(error));
    console.log(res)
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
      Disponible: (<HTMLInputElement>document.getElementById("DisponibleEditar")).checked,
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

  private get_all_repartidores() {
    this.http.get<repartidor[]>("https://localhost:7183/api/Admin/Repartidor/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.allRepatidores = result;
      this.allRepartidoresnames = [];
      this.allRepatidores.forEach(element => {this.allRepartidoresnames.push(element.NombreCompleto)});
      console.log(this.allRepatidores);
      console.log(this.allRepartidoresnames);
    }, error => console.error(error));
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

export class telefonoR {
  public CedulaRepartidor: string = "";
  public Telefono: string = "";

  constructor(CedulaRepartidor: string, Telefono: string) {
    this.Telefono = Telefono;
    this.CedulaRepartidor = CedulaRepartidor;
  }
}

