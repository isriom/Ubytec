import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";


/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-SAGerente',
  templateUrl: './SAGerente.component.html',
  styleUrls: ['./SAGerente.component.css']

})
/**
 * Clase donde se desarrolla las funcionalidades de la pagina de Cliente en la vista Cliente
 */
export class SAGerenteComponent {
  SolR = sessionStorage.getItem("SolicitudRequerida");
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
    this.SolR = 'RG'
  }
  /**
   * Metodo donde se define la funcion del boton EDIT
   * @constructor
   */
  async Edit_Button() {
    this.SolR = 'EG'
  }
  /**
   * Metodo donde se define la funcion del boton DELETE
   * @constructor
   */
  async Delete_Button() {
    this.SolR = 'DG'
  }

  /*
  -------------------------------------METODOS DE REGISTRAR UN ADMINISTRADOR-------------------------------------
   */

  /**
   * Metodo donde se define la funcion del boton SAVE para el gerente
   * @constructor
   */
  async Save_G_Button() {
    const answer = {
      Usuario: (<HTMLInputElement>document.getElementById("RGUsuario")).value,
      Nombre: (<HTMLInputElement>document.getElementById("RGNombreCompleto")).value,
      Distrito: (<HTMLInputElement>document.getElementById("RGDistrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("RGProvincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("RGCanton")).value,
      Contraseña: "1234",
      CedulaJurifica: (<HTMLInputElement>document.getElementById("RGCedulaJ")).value,

    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/Administrador/add", JSON.stringify(answer), {
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
  async Save_TG_Button() {
    const answer = {

      CedulaJurifica: (<HTMLInputElement>document.getElementById("GUsuario")).value,
      Telefono: (<HTMLInputElement>document.getElementById("GTelefono")).value,
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/TelefonoG/add", JSON.stringify(answer), {
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

  /*
  -------------------------------------METODOS DE CONSULTAR UN ADMINISTRADOR-------------------------------------
   */

  async Get_Gerente() {
    const answer = {
      Usuario: (<HTMLInputElement>document.getElementById("EGUsuario")).value,//Usuario del gerente que inicio sesion
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/Admin/list", JSON.stringify(answer), {
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
   * Metodo para obtener el telefono de un gerente
   * @constructor
   */
  async Get_TG() {
    const answer = {
      Usuario: (<HTMLInputElement>document.getElementById("CGUsuario")).value,
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/TelefonoG/list", JSON.stringify(answer), {
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

  /*
  -------------------------------------METODOS DE EDITAR UN ADMINISTRADOR-------------------------------------
   */
  /**
   * Metodo donde se define la funcion del boton Editar los datos del gerente
   * @constructor
   */
  async Edit_G_Button() {
    const answer = {
      Usuario: (<HTMLInputElement>document.getElementById("EGUsuario")).value,
      Nombre: (<HTMLInputElement>document.getElementById("EGNombreCompleto")).value,
      Distrito: (<HTMLInputElement>document.getElementById("EGDistrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("EGProvincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("EGCanton")).value,
      Contraseña: (<HTMLInputElement>document.getElementById("EGContrasena")).value,
      CedulaJurifica: (<HTMLInputElement>document.getElementById("EGCedulaJ")).value,

    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/Administrador/update", JSON.stringify(answer), {
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
   * Metodo donde se define la funcion del boton Editar los telefonos del gerente
   * @constructor
   */

  async Edit_TG_Button() {
    const answer = {

      CedulaJurifica: (<HTMLInputElement>document.getElementById("EGUsuario")).value,
      Telefono: (<HTMLInputElement>document.getElementById("EGTelefono")).value,
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/TelefonoG/update", JSON.stringify(answer), {
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

  /*
  -------------------------------------METODOS DE ELIMINAR UN ADMINISTRADOR-------------------------------------
   */

  /**
   * Metodo donde se define la funcion del boton Eliminar los datos del gerente
   * @constructor
   */
  async Delete_TG_Button() {

  }

  /**
   * Metodo donde se define la funcion del boton Eliminar los telefonos del gerente
   * @constructor
   */
  async Delete_G_Button() {

  }
}
