import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Comentario } from './comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private comentariosUrl = 'https://localhost:7183/Cliente/Comentarios';

  constructor(private http: HttpClient) { }

  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.comentariosUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getComentario(id: string | null): Observable<Comentario> {
    if (id === '') {
      return of(this.initializeComentario());
    }
    const url = `${this.comentariosUrl}/${id}`;
    return this.http.get<Comentario>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createComentario(comentario: Comentario): Observable<Comentario> {
    comentario.id = '';
    return this.http.post<Comentario>(this.comentariosUrl, comentario)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteComentario(id: string): Observable<{}> {
    const url = `${this.comentariosUrl}/${id}`;
    return this.http.delete<Comentario>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateComentario(comentario: Comentario): Observable<Comentario> {
    const url = `${this.comentariosUrl}/${comentario.id}`;
    return this.http.put<Comentario>(url, comentario)
      .pipe(
        map(() => comentario),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

  private initializeComentario(): Comentario {
    return {
      id: "",
      cedulaJAfiliado: "",
      comentario1: ""
    };
  }
}
