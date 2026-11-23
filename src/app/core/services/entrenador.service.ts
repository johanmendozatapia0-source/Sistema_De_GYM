import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import {
  CrearEntrenador,
  Entrenador,
} from '../models/entrenador.model';

@Injectable({ providedIn: 'root' })
export class EntrenadorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/entrenadores`;

  listar(): Observable<Entrenador[]> {
    return this.http.get<Entrenador[]>(this.baseUrl);
  }

  crear(entrenador: CrearEntrenador): Observable<Entrenador> {
    return this.http.post<Entrenador>(this.baseUrl, entrenador);
  }
}
