import {Component, OnInit, OnDestroy, ElementRef, ViewChildren} from '@angular/core';
import {FormControlName, FormGroup, FormBuilder, Validator} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Comentario} from '../comentario';
import {ComentarioService} from '../comentario.service';

@Component({
  selector: 'app-comentario-edit',
  templateUrl: './comentario-edit.component.html',
  styleUrls: ['./comentario-edit.component.css']
})
export class ComentarioEditComponent implements OnInit, OnDestroy {
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements!: ElementRef[];
  pageTitle = 'Editar Comentario';
  errorMessage!: string;
  comentarioForm!: FormGroup;
  tranMode!: string;
  comentario!: Comentario;
  private sub!: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private comentarioService: ComentarioService) {

    this.validationMessages = {
      CedulaJafiliado: {
        required: 'Debe ingresar un valor de cedula judridica.'
      },
      Comentario1: {
        required: 'Ingrese un comentario de su experiencia'
      }
    };
  }


  ngOnInit(): void {
    this.tranMode = "new";
    this.comentarioForm = this.fb.group({
      CedulaJafiliado: '',
      Comentario1: '',
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const CedulaJafiliado = params.get('CedulaJafiliado');
        if (id == '0') {
          const comentario: Comentario = {Id: "0", CedulaJafiliado: "", Comentario1: ""};
          this.displayComentario(comentario);
        } else {
          this.getComentario(id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getComentario(id: string | null): void {
    console.log(id);
    this.comentarioService.getComentario(id)
      .subscribe({
        next: (comentario: Comentario) => this.displayComentario(comentario),
        error: (err) => {
          this.errorMessage = <any>err;
          console.log(err)
        },
        complete: () => console.info('Editando comentario')
      });
  }

  displayComentario(comentario: Comentario): void {
    if (this.comentarioForm) {
      this.comentarioForm.reset();
    }
    this.comentario = comentario;
    if (this.comentario.Id == '0') {
      this.pageTitle = 'Agregar Comentario';
    } else {
      this.pageTitle = `Editar Comentario: ${this.comentario.CedulaJafiliado}`;
    }
    this.comentarioForm.patchValue({
      CedulaJafiliado: this.comentario.CedulaJafiliado,
      Comentario1: this.comentario.Comentario1
    });
  }

  deleteComentario(): void {
    if (this.comentario.Id == '0') {
      this.onSaveComplete();
    } else {
      if (confirm(`Desea eliminar el comentario: ${this.comentario.CedulaJafiliado}?`)) {
        this.comentarioService.deleteComentario(this.comentario.Id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => this.errorMessage = <any>err,
            complete: () => console.info('Eliminar comentario')
          });
      }
    }
  }

  saveComentario(): void {
    if (this.comentarioForm.valid) {
      if (this.comentarioForm.dirty) {
        const e: Comentario = {...this.comentario, ...this.comentarioForm.value};
        var a: Comentario = e;
        console.log(e)
        console.log(a)
        if (e.Id === '0') {
          console.log(e.Id)
          var request = this.comentarioService.createComentario(e);
          console.log(request)
          request.subscribe(
            next => this.onSaveComplete(),
            error => {
              console.log(error)
              this.errorMessage = <any>error;
            }
            , () => console.info('Comentario agregado'))
          ;
        } else {
          this.comentarioService.updateComentario(e)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err) => this.errorMessage = <any>err,
              complete: () => console.info('Actualizar comentario')
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this
        .errorMessage = 'Corrija los errores de validacion';
    }
  }

  onSaveComplete()
    :
    void {
    this.comentarioForm.reset();
    this.router.navigate(['/Cliente/Comentarios']);
  }

}
