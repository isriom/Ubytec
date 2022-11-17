import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {DealersComponent} from './dealers/dealers.component';
import {ClientsComponent} from './clients/clients.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CarritoComponent} from "./ClientView/Carrito/Carrito.component";
import {MatCardModule} from "@angular/material/card";
import {APIService} from "./api.service";
import {ConfirmacionComponent} from "./ClientView/Carrito/Confirmacion/Confirmacion.component";
import {SeleccionAfiliadoComponent} from "./ClientView/Afiliados/Afiliados.component";
import {TiendaComponent} from "./ClientView/Tienda/Tienda.component";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatSidenavModule} from "@angular/material/sidenav";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DealersComponent,
    ClientsComponent,
    CarritoComponent,
    ConfirmacionComponent,
    SeleccionAfiliadoComponent,
    TiendaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {
        path: "Cliente", children: [
          {path: 'Carrito', data: {title: "Carrito"}, component: CarritoComponent},
          {path: 'Clientes', data: {title: "Clientes"}, component: ClientsComponent},
          {path: 'Tienda', data: {title: "Tienda"}, component: TiendaComponent}
        ]
      },
      {path: 'admin/Repartidores', data: {title: "Repartidores"}, component: DealersComponent},
    ]),
    MatCardModule,
    NgbCarouselModule,
    MatSidenavModule,
    BrowserAnimationsModule,

  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
