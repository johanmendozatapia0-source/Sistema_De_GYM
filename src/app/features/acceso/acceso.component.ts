import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Acceso } from '../../core/models/acceso.model';
import { AccesoService } from '../../core/services/acceso.service';
import { getApiErrorMessage } from '../../core/utils/api-error';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
})
export class AccesoPage {
  private readonly accesoService = inject(AccesoService);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly resultado = signal<Acceso | null>(null);
  codigoSocio = '';

  validar(): void {
    const codigo = this.codigoSocio.trim();
    if (!codigo) {
      this.errorMessage.set('Ingresa el código del socio.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.resultado.set(null);
    this.accesoService.validar(codigo).subscribe({
      next: (resultado) => this.resultado.set(resultado),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
      complete: () => this.loading.set(false),
    });
  }
}
