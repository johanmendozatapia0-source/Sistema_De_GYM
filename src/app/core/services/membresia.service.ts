import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { CrearMembresia, Membresia } from '../models/membresia.model';

@Injectable({ providedIn: 'root' })
export class MembresiaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/membresias`;

  listar(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.baseUrl);
  }

  crear(membresia: CrearMembresia): Observable<Membresia> {
    return this.http.post<Membresia>(this.baseUrl, membresia);
  }
}
