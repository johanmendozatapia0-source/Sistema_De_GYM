import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { CrearSocio, Socio } from '../models/socio.model';

@Injectable({ providedIn: 'root' })
export class SocioService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/socios`;

  listar(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.baseUrl);
  }

  obtenerPorCodigo(codigoSocio: string): Observable<Socio> {
    return this.http.get<Socio>(
      `${this.baseUrl}/${encodeURIComponent(codigoSocio)}`,
    );
  }

  crear(socio: CrearSocio): Observable<Socio> {
    return this.http.post<Socio>(this.baseUrl, socio);
  }
}
