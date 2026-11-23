import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearRutina, Rutina } from '../../core/models/rutina.model';
import { Entrenador } from '../../core/models/entrenador.model';
import { EntrenadorService } from '../../core/services/entrenador.service';
import { RutinaService } from '../../core/services/rutina.service';
import { getApiErrorMessage } from '../../core/utils/api-error';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
})
export class Rutinas implements OnInit {
  private readonly rutinaService = inject(RutinaService);
  private readonly entrenadorService = inject(EntrenadorService);

  readonly rutinas = signal<Rutina[]>([]);
  readonly entrenadores = signal<Entrenador[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly showForm = signal(false);
  form: CrearRutina = {
    titulo: '',
    duracionSemanas: 4,
    nivel: 'Principiante',
    imagenUrl: '',
  };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.rutinaService.listar().subscribe({
      next: (rutinas) => this.rutinas.set(rutinas),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
      complete: () => this.loading.set(false),
    });
    this.entrenadorService.listar().subscribe({
      next: (entrenadores) => this.entrenadores.set(entrenadores),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
    });
  }

  guardar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    const payload = Object.fromEntries(
      Object.entries(this.form).filter(([, value]) => value !== '' && value != null),
    ) as CrearRutina;
    this.rutinaService.crear(payload).subscribe({
      next: (rutina) => {
        this.successMessage.set('Rutina creada correctamente.');
        this.form = {
          titulo: '',
          duracionSemanas: 4,
          nivel: 'Principiante',
          imagenUrl: '',
        };
        this.showForm.set(false);
        this.rutinas.update((rutinas) => [rutina, ...rutinas]);
      },
      error: (error: unknown) => {
        this.errorMessage.set(getApiErrorMessage(error));
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  nombreEntrenador(entrenadorId: number | null): string {
    return (
      this.entrenadores().find((entrenador) => entrenador.id === entrenadorId)
        ?.nombres ?? 'Sin asignar'
    );
  }
}
