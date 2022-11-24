import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";


/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-GAfiliado',
  templateUrl: './GAfiliado.component.html',
  styleUrls: ['./GAfiliado.component.css']

})
/**
 * Clase donde se desarrolla las funcionalidades de la pagina de Cliente en la vista Cliente
 */
export class GAfiliadoComponent {
  SolR = sessionStorage.getItem("SolicitudRequerida");
  token = sessionStorage.getItem("tokenKey");
  respuesta = {};
  TelefonosA: telefonoA[] = [];
  Afiliado: afiliado[] = [];
  http: HttpClient;
  router: Router | undefined;
  baseurl: string;
  login = new FormGroup({
      user: new FormControl(),
    }
  );
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
    this.SolR = 'I'
    this.http = http;
    this.baseurl = baseUrl;

  }

  /*
  ----------------------------------METODOS DE GESTION DE ADMIN----------------------------------
   */
  /**
   * Metodo donde se define la funcion del boton Add
   * @constructor
   */
  async Add_Button() {
    this.SolR = 'RA'
  }

  /**
   * Metodo donde se define la funcion del boton EDIT
   * @constructor
   */
  async Edit_Button() {
    this.SolR = 'EA'
  }

  /*
  -------------------------------------METODOS DE REGISTRAR UN ADMINISTRADOR-------------------------------------
   */

  /**
   * Metodo donde se define la funcion del boton SAVE para el gerente
   * @constructor
   */
  async Save_A_Button() {
    const answer: afiliado = {
      Nombre: (<HTMLInputElement>document.getElementById("RANombreCompleto")).value,
      CedulaJuridica: (<HTMLInputElement>document.getElementById("RACedulaJ")).value,
      Distrito: (<HTMLInputElement>document.getElementById("RADistrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("RAProvincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("RACanton")).value,
      Sinpe: (<HTMLInputElement>document.getElementById("RASinpe")).value,
      Correo: (<HTMLInputElement>document.getElementById("RACorreo")).value,
      Estado: "PENDIENTE"
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/Afiliado/add", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)

  }

  /**
   * Metodo donde se define la funcion del boton SAVE para el telefono del gerente
   * @constructor
   */
  async Save_TA_Button() {

    const answer: telefonoA = {
      CedulaJuridica: (<HTMLInputElement>document.getElementById("RACedulaJ")).value,
      Telefono: (<HTMLInputElement>document.getElementById("RATelefono")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/TelefonoA/add", JSON.stringify(answer), {
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
    const tel = (<HTMLInputElement>document.getElementById("RATelefono"))
    tel.value = "";
  }

  /*
  -------------------------------------METODOS DE CONSULTAR UN ADMINISTRADOR-------------------------------------
   */

  async Get_Afiliado() {
    const answer = {
        CedulaJuridica: (<HTMLInputElement>document.getElementById("EACedulaJ")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.get<afiliado[]>("https://localhost:7183/api/Admin/Afiliado/list/" + answer.CedulaJuridica, {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )

    const Nombre =(<HTMLInputElement>document.getElementById("EANombreCompleto"))
    const CedulaJuridica = (<HTMLInputElement>document.getElementById("EACedulaJ"))
    const Distrito = (<HTMLInputElement>document.getElementById("EADistrito"))
    const Provincia = (<HTMLInputElement>document.getElementById("EAProvincia"))
    const Canton = (<HTMLInputElement>document.getElementById("EACanton"))
    const Sinpe = (<HTMLInputElement>document.getElementById("EASinpe"))
    const Correo = (<HTMLInputElement>document.getElementById("EACorreo"))
    const Estado = (<HTMLInputElement>document.getElementById("EAEstado"))

    res.subscribe(result => {
      this.Afiliado = result;
      console.log(this.respuesta);
      // Asignar los valores de la consulta indicada
      Nombre.value = this.Afiliado[0].Nombre
      CedulaJuridica.value = this.Afiliado[0].CedulaJuridica
      Distrito.value = this.Afiliado[0].Distrito
      Provincia.value = this.Afiliado[0].Provincia
      Canton.value = this.Afiliado[0].Canton
      Sinpe.value = this.Afiliado[0].Sinpe
      Correo.value = this.Afiliado[0].Correo
      Estado.value = this.Afiliado[0].Estado
    }, error => console.error(error));
    console.log(res)
  }

  /**
   * Metodo para obtener el telefono de un gerente
   * @constructor
   */
  async Get_TA() {
    const answer = {
      CedulaJuridica: (<HTMLInputElement>document.getElementById("EACedulaJ")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.get<telefonoA[]>("https://localhost:7183/api/Admin/TelefonoA/list/" + answer.CedulaJuridica, {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )

    res.subscribe(result => {
      this.TelefonosA = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)

  }

  /*
  -------------------------------------METODOS DE EDITAR UN ADMINISTRADOR-------------------------------------
   */
  /**
   * Metodo donde se define la funcion del boton Editar los datos del gerente
   * @constructor
   */
  async Edit_A_Button() {
    const answer: afiliado = {
      Nombre:(<HTMLInputElement>document.getElementById("EANombreCompleto")).value,
      CedulaJuridica :(<HTMLInputElement>document.getElementById("EACedulaJ")).value,
      Distrito :(<HTMLInputElement>document.getElementById("EADistrito")).value,
      Provincia :(<HTMLInputElement>document.getElementById("EAProvincia")).value,
      Canton:(<HTMLInputElement>document.getElementById("EACanton")).value,
      Sinpe:(<HTMLInputElement>document.getElementById("EASinpe")).value,
      Correo:(<HTMLInputElement>document.getElementById("EACorreo")).value,
      Estado:(<HTMLInputElement>document.getElementById("EAEstado")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.post("https://localhost:7183/api/Admin/Afiliado/update", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.Get_Afiliado()

    }, error => console.error(error));
    console.log(res)

  }

  /**
   * Metodo donde se define la funcion del boton SAVE para el telefono del gerente cuando esta en Editar su Perfil
   * @constructor
   */
  async Save_EA_Button() {

    const answer: telefonoA = {
      CedulaJuridica: (<HTMLInputElement>document.getElementById("EACedulaJ")).value,
      Telefono: (<HTMLInputElement>document.getElementById("ERATelefono")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/TelefonoA/add", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.get_dataEditar();
    }, error => console.error(error));
    console.log(res)
    //Clear
    const tel = (<HTMLInputElement>document.getElementById("ERATelefono"))
    tel.value = "";

  }


  /*
  -------------------------------------METODOS DE ELIMINAR UN ADMINISTRADOR-------------------------------------
   */

  /**
   * Metodo donde se define la funcion del boton Eliminar los datos del gerente
   * @constructor
   */

  async Delete_A_Button() {
    const Nombre =(<HTMLInputElement>document.getElementById("EANombreCompleto")).value;
    const CedulaJuridica =(<HTMLInputElement>document.getElementById("EACedulaJ")).value;
    const Distrito = (<HTMLInputElement>document.getElementById("EADistrito")).value;
    const Provincia = (<HTMLInputElement>document.getElementById("EAProvincia")).value;
    const Canton = (<HTMLInputElement>document.getElementById("EACanton")).value;
    const Sinpe = (<HTMLInputElement>document.getElementById("EASinpe")).value;
    const Correo = (<HTMLInputElement>document.getElementById("EACorreo")).value;
    const Estado = (<HTMLInputElement>document.getElementById("EAEstado")).value;

    const key: string[] = [ CedulaJuridica,Nombre, Distrito, Provincia, Canton, Sinpe, Correo, Estado];
    console.log(key)
    console.log("Afiliado eliminado: " + (key[0])+" "+(key[1]) )
    let res = await this.http.delete("https://localhost:7183/api/Admin/Afiliado/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    //Clear
    const NombreA =(<HTMLInputElement>document.getElementById("EANombreCompleto"))
    const CedulaJuridicaA = (<HTMLInputElement>document.getElementById("EACedulaJ"))
    const DistritoA = (<HTMLInputElement>document.getElementById("EADistrito"))
    const ProvinciaA = (<HTMLInputElement>document.getElementById("EAProvincia"))
    const CantonA = (<HTMLInputElement>document.getElementById("EACanton"))
    const SinpeA = (<HTMLInputElement>document.getElementById("EASinpe"))
    const CorreoA = (<HTMLInputElement>document.getElementById("EACorreo"))
    const EstadoA = (<HTMLInputElement>document.getElementById("EAEstado"))
    NombreA.value = "";
    CedulaJuridicaA.value = "";
    DistritoA.value = "";
    ProvinciaA.value = "";
    CantonA.value = "";
    SinpeA.value = "";
    CorreoA.value = "";
    EstadoA.value = "";

  }

  /**
   * Metodo donde se define la funcion del boton Eliminar los telefonos del gerente
   * @constructor
   */
  async Delete_TA_Button(CedulaJuridica: string, Telefono: string) {
    const key: string[] = [CedulaJuridica, Telefono];
    console.log(key)
    console.log("Telefono eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7183/api/Admin/TelefonoG/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.get_dataEditar();
    }, error => console.error(error));
    //Clear
    const TelefonoG = (<HTMLInputElement>document.getElementById("EGTelefono"))
    TelefonoG.value = "";
    this.get_dataEditar();
  }

  get_dataEditar() {
    this.Get_TA();
    this.Get_Afiliado();
  }
}

export class afiliado {
  public Nombre: string="";
  public CedulaJuridica: string="";
  public Distrito: string="";
  public Provincia: string="";
  public Canton: string="";
  public Sinpe: string="";
  public Correo: string="";
  public Estado: string="";
}
export class telefonoA {
  public CedulaJuridica: string="";
  public Telefono: string="";
}
