import { Component, OnInit } from '@angular/core';
import { Comentario } from '../comentario';
import { ComentarioService } from '../comentario.service';

@Component({
  selector: 'app-comentario-list',
  templateUrl: './comentario-list.component.html',
  styleUrls: ['./comentario-list.component.css']
})
export class ComentarioListComponent implements OnInit {
  pageTitle = 'Comentarios';
  filteredComentarios: Comentario[] = [];
  comentarios: Comentario[] = [];
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredComentarios = this.listFilter ? this.performFilter(this.listFilter) : this.comentarios;
  }

  constructor(private comentarioService: ComentarioService) { }

  performFilter(filterBy: string): Comentario[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.comentarios.filter((comentario: Comentario) =>
      comentario.cedulaJAfiliado.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.getComentarioData();
  }

  getComentarioData() {
    this.comentarioService.getComentarios()
      .subscribe({
        next: (comentarios) => {
          this.comentarios = comentarios;
          this.filteredComentarios = comentarios;
        },
        error: (err) => this.errorMessage = <any>err,
        complete: () => console.info('Obteniendo comentarios de la lista')
      });
  }

  deleteComentario(id: string, cedulaJAfiliado: string): void {
    if (id == '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Confirme que desea eliminar este comentario: ${cedulaJAfiliado}?`)) {
        this.comentarioService.deleteComentario(id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => this.errorMessage = <any>err,
            complete: () => console.info('Eliminar comentario de la lista')
          });
      }
    }
  }

  onSaveComplete(): void {
    this.comentarioService.getComentarios()
      .subscribe({
        next: (comentarios) => {
          this.comentarios = comentarios;
          this.filteredComentarios = comentarios;
        },
        error: (err) => this.errorMessage = <any>err,
        complete: () => console.info('Obteniendo comentarios de la lista')
      });
  }

}
