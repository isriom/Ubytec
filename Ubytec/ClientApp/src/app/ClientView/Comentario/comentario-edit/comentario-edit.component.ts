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
      ComprobantePago: {
        required: 'Debe ingresar un comprobante de pago.'
      },
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
      ComprobantePago: '',
      CedulaJafiliado: '',
      Comentario1: '',
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const CedulaJafiliado = params.get('CedulaJafiliado');
        if (id == '0') {
          const comentario: Comentario = { Id: "0", ComprobantePago: "", CedulaJafiliado: "", Comentario1: "" };
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
      this.pageTitle = `Editar Comentario: ${this.comentario.ComprobantePago}`;
    }
    this.comentarioForm.patchValue({
      ComprobantePago: this.comentario.ComprobantePago,
      CedulaJafiliado: this.comentario.CedulaJafiliado,
      Comentario1: this.comentario.Comentario1
    });
  }

  deleteComentario(): void {
    if (this.comentario.Id == '0') {
      this.onSaveComplete();
    } else {
      if (confirm(`Desea eliminar el comentario: ${this.comentario.ComprobantePago}?`)) {
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
        const e = { ...this.comentario, ...this.comentarioForm.value };
        if (e.Id === '0') {
          this.comentarioService.createComentario(e)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err) => this.errorMessage = <any>err,
              complete: () => console.info('Comentario agregado')
            });
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
