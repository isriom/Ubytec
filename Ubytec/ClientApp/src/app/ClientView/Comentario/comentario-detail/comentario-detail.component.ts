import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../comentario';
import { ComentarioService } from '../comentario.service';

@Component({
  selector: 'app-comentario-detail',
  templateUrl: './comentario-detail.component.html',
  styleUrls: ['./comentario-detail.component.css']
})
export class ComentarioDetailComponent implements OnInit {
  pageTitle = 'Detalles de Comentario';
  errorMessage = '';
  comentario: Comentario | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private comentarioService: ComentarioService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getComentario(id);
    }
  }

  getComentario(id: string) {
    this.comentarioService.getComentario(id)
      .subscribe({
        next: (comentario) => this.comentario = comentario,
        error: (err) => this.errorMessage = <any>err,
        complete: () => console.info('Obtener comentario en detalles de comentario')
      });
  }

  onBack(): void {
    this.router.navigate(['/Cliente/Comentarios']);
  }
}
