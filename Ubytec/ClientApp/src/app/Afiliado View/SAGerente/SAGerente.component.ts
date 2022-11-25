import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";


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
  user = sessionStorage.getItem("Nombre")
  respuesta = {};
  TelefonosG: telefonoG[] = [];
  Administrador: administrador[] = [];
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
    this.Get_Afiliado()
  }
  /**
   * Metodo donde se define la funcion del boton EDIT
   * @constructor
   */
  async Edit_Button() {
    this.SolR = 'EG'
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

    const answer: telefonoG = {
      Usuario: (<HTMLInputElement>document.getElementById("RGUsuario")).value,
      Telefono: (<HTMLInputElement>document.getElementById("RGTelefono")).value,
    };

    console.log(JSON.stringify(answer));
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
    //Clear
    const tel = (<HTMLInputElement>document.getElementById("RGTelefono"))
    tel.value = "";
  }

  /*
  -------------------------------------METODOS DE CONSULTAR UN ADMINISTRADOR-------------------------------------
   */

  async Get_Afiliado() {
    const answer = {
      Usuario: this.user
    };
    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.get<administrador[]>("https://localhost:7183/api/Afiliado/Administrador/list/" + answer.Usuario,  {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )

    res.subscribe(result => {
      this.Administrador = result;
      console.log(this.respuesta);
      // Parser result para obtener los datos
      const cedula = (<HTMLInputElement>document.getElementById("RGCedulaJ"))
      cedula.value = this.Administrador[0].CedulaJuridica;
    }, error => console.error(error));
    console.log(res)

  }
  async Get_Gerente() {
    const answer = {
      Usuario: (<HTMLInputElement>document.getElementById("EGUsuario")).value,
    };

    console.log(JSON.stringify(answer));
    console.log(answer);
    let res = await this.http.get<administrador[]>("https://localhost:7183/api/Afiliado/Administrador/list/" + answer.Usuario, {
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
      this.Administrador = result;
      console.log(this.respuesta);
      // Asignar los valores de la consulta indicada
      NombreCompleto.value = this.Administrador[0].NombreCompleto;
      Distrito.value = this.Administrador[0].Distrito;
      Provincia.value = this.Administrador[0].Provincia;
      Canton.value =  this.Administrador[0].Canton;
      Contraseña.value = this.Administrador[0].Contraseña;
      CedulaJuridica.value = this.Administrador[0].CedulaJuridica;
    }, error => console.error(error));
    console.log(res)
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
    let res = await this.http.get<telefonoG[]>("https://localhost:7183/api/Afiliado/TelefonoG/list/" + answer.Usuario, {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.TelefonosG = result;
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
    let res = await this.http.post("https://localhost:7183/api/Afiliado/Administrador/update", JSON.stringify(answer), {
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
    let res = await this.http.put("https://localhost:7183/api/Afiliado/TelefonoG/add", JSON.stringify(answer), {
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
    let res = await this.http.delete("https://localhost:7183/api/Afiliado/Administrador/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    //Clear
    const Usuario1 = (<HTMLInputElement>document.getElementById("EGUsuario"))
    const NombreCompleto1 = (<HTMLInputElement>document.getElementById("EGNombreCompleto"))
    const Distrito1 = (<HTMLInputElement>document.getElementById("EGDistrito"))
    const Provincia1 = (<HTMLInputElement>document.getElementById("EGProvincia"))
    const Canton1 = (<HTMLInputElement>document.getElementById("EGCanton"))
    const Contraseña1 = (<HTMLInputElement>document.getElementById("EGContrasena"))
    const CedulaJuridica1 = (<HTMLInputElement>document.getElementById("EGCedulaJ"))
    Usuario1.value = "";
    NombreCompleto1.value = "";
    Distrito1.value = "";
    Provincia1.value = "";
    Canton1.value = "";
    Contraseña1.value = "";
    CedulaJuridica1.value = "";
  }

  /**
   * Metodo donde se define la funcion del boton Eliminar los telefonos del gerente
   * @constructor
   */
  async Delete_TG_Button(Usuario: string, Telefono: string) {
    const key: string[] = [Usuario,Telefono];
    console.log(key)
    console.log("Telefono eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7183/api/Afiliado/TelefonoG/delete", {
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
    const Telefono1 = (<HTMLInputElement>document.getElementById("EGTelefono"))
    Telefono1.value = "";
    this.get_dataEditar();
  }

  get_dataEditar() {
    this.Get_TG();
    this.Get_Gerente();
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


