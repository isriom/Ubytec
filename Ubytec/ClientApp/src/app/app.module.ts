import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {DealersComponent} from './AdminView/dealers/dealers.component';
import {ClientsComponent} from './AdminView/clients/clients.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CarritoComponent} from "./ClientView/Carrito/Carrito.component";
import {MatCardModule} from "@angular/material/card";
import {APIService} from "./ClientView/api.service";
import {ConfirmacionComponent} from "./ClientView/Carrito/Confirmacion/Confirmacion.component";
import {SeleccionAfiliadoComponent} from "./ClientView/Afiliados/Afiliados.component";
import {TiendaComponent} from "./ClientView/Tienda/Tienda.component";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ConsolidadoVentasComponent
} from './AdminView/ConsolidadoVentas/consolidado-ventas/consolidado-ventas.component';
import {AdminService} from "./AdminView/admin.service";
import {MatTableModule} from "@angular/material/table";

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
    TiendaComponent,
    ConsolidadoVentasComponent
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
      }, {
        path: "Admin", children: [
          {path: 'Dealers', data: {title: "Dealers"}, component: DealersComponent},
          {path: 'ConsolidadoVentas', data: {title: "ConsolidadoVentas"}, component: ConsolidadoVentasComponent}
        ]
      },
    ]),
    MatCardModule,
    NgbCarouselModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatTableModule,

  ],
  providers: [APIService, AdminService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
