import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CrearEntrenador,
  Entrenador,
} from '../../core/models/entrenador.model';
import { EntrenadorService } from '../../core/services/entrenador.service';
import { getApiErrorMessage } from '../../core/utils/api-error';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
})
export class Entrenadores implements OnInit {
  private readonly entrenadorService = inject(EntrenadorService);

  readonly entrenadores = signal<Entrenador[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly showForm = signal(false);
  form: CrearEntrenador = { nombres: '', especialidad: '', telefono: '' };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.entrenadorService.listar().subscribe({
      next: (entrenadores) => this.entrenadores.set(entrenadores),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
      complete: () => this.loading.set(false),
    });
  }

  guardar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.entrenadorService.crear(this.form).subscribe({
      next: (entrenador) => {
        this.successMessage.set('Entrenador creado correctamente.');
        this.form = { nombres: '', especialidad: '', telefono: '' };
        this.showForm.set(false);
        this.entrenadores.update((entrenadores) => [entrenador, ...entrenadores]);
      },
      error: (error: unknown) => {
        this.errorMessage.set(getApiErrorMessage(error));
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
