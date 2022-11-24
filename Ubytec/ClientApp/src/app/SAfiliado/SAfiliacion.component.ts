import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";


/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-SAfiliacion',
  templateUrl: './SAfiliacion.component.html',
  styleUrls: ['./SAfiliacion.component.css']

})
/**
 * Clase donde se desarrolla las funcionalidades de la pagina de Solicitud de Afiliacion en el boton Registrar
 */
export class SAfiliacionComponent {
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
--------------------------------------------Metodos de Activacion de los botones--------------------------------------------
 */
  /**
   * Metodo donde se definen las acciones a realizar al clickear el boton de Registrar Afiliado
   * @constructor metodo relacionado
   */
  async Afiliado_Button() {
    this.SolR ='A'
  }


  /**
   * Metodo donde se definen las acciones a realizar al clickear el boton de Registrar Administrador
   * @constructor metodo relacionado
   */
  async Gerente_Button() {
    this.SolR ='G'
  }



  /*
  ----------------------------------------AFILIADO----------------------------------------
   */



  /**
   * Metodo donde se define la funcion del boton SAVE para el afiliado
   * @constructor
   */
  async Save_A_Button() {
    const answer:afiliado = {
      Nombre: (<HTMLInputElement>document.getElementById("ANombreCompleto")).value,
      CedulaJuridica: (<HTMLInputElement>document.getElementById("ACedulaJ")).value,
      Distrito: (<HTMLInputElement>document.getElementById("ADistrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("AProvincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("ACanton")).value,
      Sinpe: (<HTMLInputElement>document.getElementById("ASinpe")).value,
      Correo: (<HTMLInputElement>document.getElementById("ACorreo")).value,
      Estado: "PENDIENTE"
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/Afiliado/solicitud", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
    // Clear de los espacios de texto
    const nombre = (<HTMLInputElement>document.getElementById("ANombreCompleto"))
    nombre.value = "";
    const cedula = (<HTMLInputElement>document.getElementById("ACedulaJ"))
    cedula.value = "";
    const distrito = (<HTMLInputElement>document.getElementById("ADistrito"))
    distrito.value = "";
    const provincia = (<HTMLInputElement>document.getElementById("AProvincia"))
    provincia.value = "";
    const canton = (<HTMLInputElement>document.getElementById("ACanton"))
    canton.value = "";
    const sinpe = (<HTMLInputElement>document.getElementById("ASinpe"))
    sinpe.value = "";
    const correo = (<HTMLInputElement>document.getElementById("ACorreo"))
    correo.value = "";

  }
  /**
   * Metodo donde se define la funcion del boton SAVE para el telefono del afiliado
   * @constructor
   */
  async Save_TA_Button() {
    const answer : telefonoA ={
      CedulaJuridica: (<HTMLInputElement>document.getElementById("ACedulaJ")).value,
      Telefono: (<HTMLInputElement>document.getElementById("ATelefono")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/TelefonoA/solicitud", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
    const tel = (<HTMLInputElement>document.getElementById("ATelefono"))
    tel.value = "";
  }


  /*
  ----------------------------------------------------ADMINISTRADOR DEL COMERCIO----------------------------------------------------
   */


  /**
   * Metodo donde se define la funcion del boton SAVE para el gerente
   * @constructor
   */
  async Save_G_Button() {
    const answer:administrador = {
      Usuario: (<HTMLInputElement>document.getElementById("GUsuario")).value,
      NombreCompleto: (<HTMLInputElement>document.getElementById("GNombreCompleto")).value,
      Distrito: (<HTMLInputElement>document.getElementById("GDistrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("GProvincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("GCanton")).value,
      Contraseña: "1234",
      CedulaJuridica: (<HTMLInputElement>document.getElementById("GCedulaJ")).value,

    };
    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/Admin/solicitud", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
    // Clear de los espacios de texto
    const usuario = (<HTMLInputElement>document.getElementById("GUsuario"))
    usuario.value = "";
    const nombre = (<HTMLInputElement>document.getElementById("GNombreCompleto"))
    nombre.value = "";
    const distrito = (<HTMLInputElement>document.getElementById("GDistrito"))
    distrito.value = "";
    const provincia = (<HTMLInputElement>document.getElementById("GProvincia"))
    provincia.value = "";
    const canton = (<HTMLInputElement>document.getElementById("GCanton"))
    canton.value = "";
    const cedula = (<HTMLInputElement>document.getElementById("GCedulaJ"))
    cedula.value = "";


  }

  /**
   * Metodo donde se define la funcion del boton SAVE para el telefono del gerente
   * @constructor
   */
  async Save_TG_Button() {
    const answer:telefonoG = {

      Usuario: (<HTMLInputElement>document.getElementById("GUsuario")).value,
      Telefono: (<HTMLInputElement>document.getElementById("GTelefono")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Afiliado/TelefonoG/solicitud", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
    // Clear de los espacios de texto
    const tel = (<HTMLInputElement>document.getElementById("GTelefono"))
    tel.value = "";
  }
}

/*
--------------------------------------------Estructuras --------------------------------------------
 */
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
export class administrador {
  public Usuario: string="";
  public NombreCompleto: string="";
  public Distrito: string="";
  public Provincia: string="";
  public Canton: string="";
  public Contraseña: string="";
  public CedulaJuridica: string="";
}
export class telefonoG {
  public Usuario: string="";
  public Telefono: string="";
}
