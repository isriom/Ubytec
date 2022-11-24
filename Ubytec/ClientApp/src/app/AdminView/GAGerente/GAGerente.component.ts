import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";


/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-GAGerente',
  templateUrl: './GAGerente.component.html',
  styleUrls: ['./GAGerente.component.css']

})
/**
 * Clase donde se desarrolla las funcionalidades de la pagina de Cliente en la vista Cliente
 */
export class GAGerenteComponent {
  SolR = sessionStorage.getItem("SolicitudRequerida");
  token = sessionStorage.getItem("tokenKey");
  user = sessionStorage.getItem("Nombre")
  respuesta = {};
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
    console.log(this.user)
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
    const answer:administrador = {
      Usuario: (<HTMLInputElement>document.getElementById("RGUsuario")).value,
      NombreCompleto: (<HTMLInputElement>document.getElementById("RGNombreCompleto")).value,
      Distrito: (<HTMLInputElement>document.getElementById("RGDistrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("RGProvincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("RGCanton")).value,
      Contraseña: "1234",
      CedulaJuridica: (<HTMLInputElement>document.getElementById("RGCedulaJ")).value,

    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/Administrador/add", JSON.stringify(answer), {
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
    const usuario = (<HTMLInputElement>document.getElementById("RGUsuario"))
    const nombre = (<HTMLInputElement>document.getElementById("RGNombreCompleto"))
    const distrito = (<HTMLInputElement>document.getElementById("RGDistrito"))
    const provincia = (<HTMLInputElement>document.getElementById("RGProvincia"))
    const canton = (<HTMLInputElement>document.getElementById("RGCanton"))
    const cedula = (<HTMLInputElement>document.getElementById("RGCedulaJ"))
    usuario.value = "";
    nombre.value = "";
    distrito.value = "";
    provincia.value = "";
    canton.value = "";
    cedula.value = "";

  }

  /**
   * Metodo donde se define la funcion del boton SAVE para el telefono del gerente
   * @constructor
   */
  async Save_TG_Button() {

    const answer: telefonoG = {
      Usuario: (<HTMLInputElement>document.getElementById("RGUsuario")).value,
      Telefono: (<HTMLInputElement>document.getElementById("RGTelefono")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/TelefonoG/add", JSON.stringify(answer), {
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
    const tel = (<HTMLInputElement>document.getElementById("RGTelefono"))
    tel.value = "";
  }

  /*
  -------------------------------------METODOS DE CONSULTAR UN ADMINISTRADOR-------------------------------------
  //No implementado aun
   */

  async Get_Gerente() {
    const answer = {
      Usuario: (<HTMLInputElement>document.getElementById("EGUsuario")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/Administrador/list", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )

    const NombreCompleto = (<HTMLInputElement>document.getElementById("EGNombreCompleto"))
    const Distrito =  (<HTMLInputElement>document.getElementById("EGDistrito"))
    const Provincia = (<HTMLInputElement>document.getElementById("EGProvincia"))
    const Canton = (<HTMLInputElement>document.getElementById("EGCanton"))
    const Contraseña = (<HTMLInputElement>document.getElementById("EGContrasena"))
    const CedulaJuridica =(<HTMLInputElement>document.getElementById("EGCedulaJ"))

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
    Contraseña.value = "Contraseña";
    CedulaJuridica.value = "CedulaJuridica";



  }
  /**
   * Metodo para obtener el telefono de un gerente
   * @constructor
   */
  async Get_TG() {
    const answer = {
      Usuario: (<HTMLInputElement>document.getElementById("EGUsuario")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/TelefonoG/list", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    const telG = <HTMLInputElement>document.getElementById("EGTelefono")

    res.subscribe(result => {
      this.respuesta = result;
      // Parser result para obtener los datos y hacer un ciclo para recorrer la lista

      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
    // Telefonos recopilados
    telG.value = "2665213"



  }

  /*
  -------------------------------------METODOS DE EDITAR UN ADMINISTRADOR-------------------------------------
   */
  /**
   * Metodo donde se define la funcion del boton Editar los datos del gerente
   * @constructor
   */
  async Edit_G_Button() {
    const answer: administrador = {
      Usuario: (<HTMLInputElement>document.getElementById("EGUsuario")).value,
      NombreCompleto: (<HTMLInputElement>document.getElementById("EGNombreCompleto")).value,
      Distrito: (<HTMLInputElement>document.getElementById("EGDistrito")).value,
      Provincia: (<HTMLInputElement>document.getElementById("EGProvincia")).value,
      Canton: (<HTMLInputElement>document.getElementById("EGCanton")).value,
      Contraseña: (<HTMLInputElement>document.getElementById("EGContrasena")).value,
      CedulaJuridica: (<HTMLInputElement>document.getElementById("EGCedulaJ")).value,

    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.post("https://localhost:7183/api/Admin/Administrador/update", JSON.stringify(answer), {
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
   * Metodo donde se define la funcion del boton SAVE para el telefono del gerente cuando esta en Editar su Perfil
   * @constructor
   */
  async Save_EG_Button() {

    const answer: telefonoG = {
      Usuario: (<HTMLInputElement>document.getElementById("EGUsuario")).value,
      Telefono: (<HTMLInputElement>document.getElementById("ERGTelefono")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.put("https://localhost:7183/api/Admin/TelefonoG/add", JSON.stringify(answer), {
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
    const tel = (<HTMLInputElement>document.getElementById("ERGTelefono"))
    tel.value = "";
  }


  /*
  -------------------------------------METODOS DE ELIMINAR UN ADMINISTRADOR-------------------------------------
   */

  /**
   * Metodo donde se define la funcion del boton Eliminar los datos del gerente
   * @constructor
   */
  //Este no funciona
  async Delete_G_Button() {
    const Usuario= (<HTMLInputElement>document.getElementById("EGUsuario")).value;
    const NombreCompleto = (<HTMLInputElement>document.getElementById("EGNombreCompleto")).value;
    const Distrito =  (<HTMLInputElement>document.getElementById("EGDistrito")).value;
    const Provincia = (<HTMLInputElement>document.getElementById("EGProvincia")).value;
    const Canton = (<HTMLInputElement>document.getElementById("EGCanton")).value;
    const Contraseña = (<HTMLInputElement>document.getElementById("EGContrasena")).value;
    const CedulaJuridica =(<HTMLInputElement>document.getElementById("EGCedulaJ")).value;
    const key: string[] = [Usuario, NombreCompleto, Distrito, Provincia, Canton, Contraseña, CedulaJuridica];
    console.log(key)
    console.log("Administrador eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7183/api/Admin/Administrador/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    //Clear
    const UsuarioG = (<HTMLInputElement>document.getElementById("EGUsuario"))
    const NombreCompletoG = (<HTMLInputElement>document.getElementById("EGNombreCompleto"))
    const DistritoG = (<HTMLInputElement>document.getElementById("EGDistrito"))
    const ProvinciaG = (<HTMLInputElement>document.getElementById("EGProvincia"))
    const CantonG = (<HTMLInputElement>document.getElementById("EGCanton"))
    const ContraseñaG = (<HTMLInputElement>document.getElementById("EGContrasena"))
    const CedulaJuridicaG = (<HTMLInputElement>document.getElementById("EGCedulaJ"))
    UsuarioG.value = "";
    NombreCompletoG.value = "";
    DistritoG.value = "";
    ProvinciaG.value = "";
    CantonG.value = "";
    ContraseñaG.value = "";
    CedulaJuridicaG.value = "";
  }

  /**
   * Metodo donde se define la funcion del boton Eliminar los telefonos del gerente
   * @constructor
   */
  async Delete_TG_Button() {
    const Usuario= (<HTMLInputElement>document.getElementById("EGUsuario")).value;
    const Telefono= (<HTMLInputElement>document.getElementById("EGTelefono")).value;
    const key: string[] = [Usuario,Telefono];
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

    }, error => console.error(error));
    //Clear
    const TelefonoG = (<HTMLInputElement>document.getElementById("EGTelefono"))
    TelefonoG.value = "";
  }

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
