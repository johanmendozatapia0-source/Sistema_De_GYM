import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { CrearRutina, Rutina } from '../models/rutina.model';

@Injectable({ providedIn: 'root' })
export class RutinaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/rutinas`;

  listar(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.baseUrl);
  }

  crear(rutina: CrearRutina): Observable<Rutina> {
    return this.http.post<Rutina>(this.baseUrl, rutina);
  }
}
