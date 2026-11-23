import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Socio } from '../../core/models/socio.model';
import { Resumen } from '../../core/models/resumen.model';
import { DashboardService } from '../../core/services/dashboard.service';
import { SocioService } from '../../core/services/socio.service';
import { getApiErrorMessage } from '../../core/utils/api-error';
import { finalize } from 'rxjs';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly socioService = inject(SocioService);

  readonly resumen = signal<Resumen | null>(null);
  readonly socios = signal<Socio[]>([]);
  readonly errorMessage = signal('');
  readonly loading = signal(false);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    let completed = 0;
    const completeRequest = (): void => {
      completed += 1;
      if (completed === 2) {
        this.loading.set(false);
      }
    };

    this.dashboardService.obtenerResumen().pipe(finalize(completeRequest)).subscribe({
      next: (resumen) => this.resumen.set(resumen),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
    });
    this.socioService.listar().pipe(finalize(completeRequest)).subscribe({
      next: (socios) => this.socios.set(socios),
      error: (error: unknown) => this.errorMessage.set(getApiErrorMessage(error)),
    });
  }

  formatDate(date: string | null): string {
    if (!date) {
      return 'Sin fecha';
    }
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? date
      : new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(parsedDate);
  }
}
