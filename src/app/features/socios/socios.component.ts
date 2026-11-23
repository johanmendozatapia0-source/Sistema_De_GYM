import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearSocio, Socio } from '../../core/models/socio.model';
import { SocioService } from '../../core/services/socio.service';
import { getApiErrorMessage } from '../../core/utils/api-error';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-socios',
  templateUrl: './socios.component.html',
})
export class Socios implements OnInit {
  private readonly socioService = inject(SocioService);

  readonly socios = signal<Socio[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly showForm = signal(false);
  readonly searchText = signal('');
  readonly createdMemberCode = signal('');
  readonly filteredSocios = computed(() => {
    const query = this.searchText().trim().toLocaleLowerCase();
    if (!query) {
      return this.socios();
    }
    return this.socios().filter((socio) =>
      [socio.nombres, socio.codigoSocio, socio.dni ?? '']
        .join(' ')
        .toLocaleLowerCase()
        .includes(query),
    );
  });

  form: CrearSocio = { nombres: '', dni: '', telefono: '', fotoUrl: '' };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.socioService.listar().subscribe({
      next: (socios) => this.socios.set(socios),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
      complete: () => this.loading.set(false),
    });
  }

  guardar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.createdMemberCode.set('');
    const payload = Object.fromEntries(
      Object.entries(this.form).filter(([, value]) => value !== ''),
    ) as CrearSocio;

    this.socioService.crear(payload).subscribe({
      next: (socio) => {
        this.createdMemberCode.set(socio.codigoSocio);
        this.successMessage.set('Socio registrado correctamente.');
        this.form = { nombres: '', dni: '', telefono: '', fotoUrl: '' };
        this.showForm.set(false);
        this.socios.update((socios) => [socio, ...socios]);
      },
      error: (error: unknown) => {
        this.errorMessage.set(getApiErrorMessage(error));
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  formatDate(date: string | null): string {
    if (!date) {
      return 'Sin vigencia';
    }
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? date
      : new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(parsedDate);
  }
}
