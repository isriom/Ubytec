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
import {ConsolidadoVentasComponent} from './AdminView/Reportes/consolidado-ventas/consolidado-ventas.component';
import {AdminService, VentasAfiliado} from "./AdminView/admin.service";
import {MatTableModule} from "@angular/material/table";
import {SAfiliacionComponent} from "./SAfiliado/SAfiliacion.component";
import {SAGerenteComponent} from "./Afiliado View/SAGerente/SAGerente.component";
import {GAfiliadoComponent} from "./AdminView/GAfiliado/GAfiliado.component";
import {GAGerenteComponent} from "./AdminView/GAGerente/GAGerente.component";
import {RepartidoresPagoComponent} from "./AdminView/Reportes/Repartidores-Pago/Repartidores-Pago.component";
import {VentasAfiliadoComponent} from "./AdminView/Reportes/Ventas-Afiliado/Ventas-Afiliado.component";
import {AsignarRepartidorComponent} from "./Afiliado View/Asignar Repartidor/AsignarRepartidor.component";
import {AfiliadoService} from "./Afiliado View/Afiliado.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";

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
    ConsolidadoVentasComponent,
    SAfiliacionComponent,
    SAGerenteComponent,
    GAfiliadoComponent,
    GAGerenteComponent,
    ConsolidadoVentasComponent,
    RepartidoresPagoComponent,
    VentasAfiliadoComponent,
    AsignarRepartidorComponent
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
          {path: 'ConsolidadoVentas', data: {title: "ConsolidadoVentas"}, component: ConsolidadoVentasComponent},
          {path: 'Afiliado', data: {title: "Gestion Afiliado"}, component: GAfiliadoComponent},
          {path: 'Gerente', data: {title: "Gestion Gerente"}, component:GAGerenteComponent},
          {path: 'ConsolidadoVentas', data: {title: "ConsolidadoVentas"}, component: ConsolidadoVentasComponent},
          {path: 'RepartidoresPago', data: {title: "RepartidoresPago"}, component: RepartidoresPagoComponent},
          {path: 'VentasAfiliado', data: {title: "RepartidoresPago"}, component: VentasAfiliadoComponent}
        ]
      }, {
        path: "Afiliado", children: [
          {path: 'Administrador', data: {title: "GestionAdministrador"}, component: SAGerenteComponent},
          {path: 'Solicitud', data: {title: "Solicitud de Afiliado"}, component: SAfiliacionComponent},
          {path: 'Repartidor', data: {title: "Asignar Repartidor"}, component: AsignarRepartidorComponent},

        ]
      }
    ]),
    MatCardModule,
    NgbCarouselModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatExpansionModule,
    MatCheckboxModule,

  ],
  providers: [APIService, AdminService, AfiliadoService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
