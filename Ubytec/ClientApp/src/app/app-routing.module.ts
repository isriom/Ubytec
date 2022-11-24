import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentarioDetailComponent } from './ClientView/Comentario/comentario-detail/comentario-detail.component';
import { ComentarioEditComponent } from './ClientView/Comentario/comentario-edit/comentario-edit.component';
import { ComentarioListComponent } from './ClientView/Comentario/comentario-list/comentario-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'Cliente/Comentarios',
    component: ComentarioListComponent
  },
  {
    path: 'Cliente/Comentarios/:id',
    component: ComentarioDetailComponent
  },
  {
    path: 'Cliente/Comentarios/:id/edit',
    component: ComentarioEditComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
