import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Resumen } from '../models/resumen.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  obtenerResumen(): Observable<Resumen> {
    return this.http.get<Resumen>(`${environment.apiUrl}/dashboard/resumen`);
  }
}
