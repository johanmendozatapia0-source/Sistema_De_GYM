import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CrearMembresia,
  Membresia,
} from '../../core/models/membresia.model';
import { MembresiaService } from '../../core/services/membresia.service';
import { getApiErrorMessage } from '../../core/utils/api-error';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
})
export class Membresias implements OnInit {
  private readonly membresiaService = inject(MembresiaService);

  readonly membresias = signal<Membresia[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly showForm = signal(false);
  form: CrearMembresia = { nombre: '', duracionDias: 30, precio: 0 };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.membresiaService.listar().subscribe({
      next: (membresias) => this.membresias.set(membresias),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
      complete: () => this.loading.set(false),
    });
  }

  guardar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.membresiaService.crear(this.form).subscribe({
      next: (membresia) => {
        this.successMessage.set('Plan creado correctamente.');
        this.form = { nombre: '', duracionDias: 30, precio: 0 };
        this.showForm.set(false);
        this.membresias.update((membresias) => [membresia, ...membresias]);
      },
      error: (error: unknown) => {
        this.errorMessage.set(getApiErrorMessage(error));
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
