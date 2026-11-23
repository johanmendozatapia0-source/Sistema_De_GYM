import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { CrearPago, PagoCreado } from '../models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private readonly http = inject(HttpClient);

  registrar(pago: CrearPago): Observable<PagoCreado> {
    return this.http.post<PagoCreado>(`${environment.apiUrl}/pagos`, pago);
  }
}
