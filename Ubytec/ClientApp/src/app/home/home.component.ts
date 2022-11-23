import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {APIService, Login} from "../ClientView/api.service";




/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

/**
 * Clase donde se desarrolla lo relacionada a la pantalla inicial de la pagina
 */
export class HomeComponent implements OnInit {
  //Variables a utilizar
  token = sessionStorage.getItem("Token");
  user = sessionStorage.getItem("Nombre")
  rol = sessionStorage.getItem("Rol")
  headers = {};
  respuesta = {};
  http: HttpClient;
  router: Router | undefined;
  baseurl: string;
  login = new FormGroup({
      pass: new FormControl(),
      user: new FormControl(),
    }
  );
  conexion = "Trabajador"

  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   * @param snackBar injector of snackbar
   * @param service injector of service
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public snackBar: MatSnackBar, private service: APIService) {
    this.http = http;
    this.baseurl = baseUrl;
    if (this.token === undefined) {
      this.token = "null";
    }
    console.log(this.token)
    console.log(this.user)
  }

  /**
   * Metodo donde se define la accion de atraer los datos para realizar las verificaciones correspondientes e iniciar sesion
   * @constructor metodo relacionado
   */
  async Sig_In() {

    const answer = new Login;
    answer.username = this.login.controls.user.value;
    answer.password = this.login.controls.pass.value;
    answer.role = this.conexion;
    console.log(answer);
    let res = await this.service.login(answer);
  }

  /**
   * Metodo donde se desarrolla la accion de cerrar sesion en la pagina
   */
  async logout() {
    this.service.logout();
    this.snackBar.open("Log out sucefully", "close");
  }

  Select() {
    const buttton = <HTMLButtonElement>document.getElementById("Selector");
    if (buttton.innerText == "Trabajador") {
      buttton.innerText = "Afiliado";
      this.conexion = "Afiliado";
      return;
    } else if (buttton.innerText == "Afiliado") {
      buttton.innerText = "Cliente";
      this.conexion = "Cliente";
      return;
    } else if (buttton.innerText == "Cliente") {
      buttton.innerText = "Trabajador";
      this.conexion = "Trabajador";
      return;
    }
  }

  ngOnInit() {

  }

  Register() {

    if (this.conexion == "Afiliado") {
      window.location.assign(this.baseurl + "Afiliado/Solicitud")
    }

  }
}
