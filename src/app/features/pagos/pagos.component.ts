import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Membresia } from '../../core/models/membresia.model';
import { PagoCreado } from '../../core/models/pago.model';
import { Socio } from '../../core/models/socio.model';
import { MembresiaService } from '../../core/services/membresia.service';
import { PagoService } from '../../core/services/pago.service';
import { SocioService } from '../../core/services/socio.service';
import { getApiErrorMessage } from '../../core/utils/api-error';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
})
export class Pagos implements OnInit {
  private readonly socioService = inject(SocioService);
  private readonly membresiaService = inject(MembresiaService);
  private readonly pagoService = inject(PagoService);

  readonly socios = signal<Socio[]>([]);
  readonly membresias = signal<Membresia[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly pagoResultado = signal<PagoCreado | null>(null);
  form: { socioId: number | null; membresiaId: number | null } = {
    socioId: null,
    membresiaId: null,
  };

  ngOnInit(): void {
    this.cargarOpciones();
  }

  cargarOpciones(): void {
    this.socioService.listar().subscribe({
      next: (socios) => this.socios.set(socios),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
    });
    this.membresiaService.listar().subscribe({
      next: (membresias) => this.membresias.set(membresias),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
    });
  }

  registrar(): void {
    const { socioId, membresiaId } = this.form;
    if (!socioId || !membresiaId) {
      this.errorMessage.set('Selecciona un socio y un plan para continuar.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.pagoResultado.set(null);
    this.pagoService.registrar({ socioId, membresiaId }).subscribe({
      next: (pago) => {
        this.pagoResultado.set(pago);
        this.successMessage.set('Pago registrado y vigencia actualizada.');
      },
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
      complete: () => this.loading.set(false),
    });
  }

  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? date
      : new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(parsedDate);
  }
}
