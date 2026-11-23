import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Acceso } from '../models/acceso.model';

@Injectable({ providedIn: 'root' })
export class AccesoService {
  private readonly http = inject(HttpClient);

  validar(codigoSocio: string): Observable<Acceso> {
    return this.http.post<Acceso>(`${environment.apiUrl}/acceso/validar`, {
      codigoSocio,
    });
  }
}
