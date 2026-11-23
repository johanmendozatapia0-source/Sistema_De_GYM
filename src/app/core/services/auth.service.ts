import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  afterNextRender,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

const SESSION_KEY = 'gymfit.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  readonly user = signal<AuthResponse | null>(null);

  constructor() {
    afterNextRender(() => this.user.set(this.restoreSession()));
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(tap((response) => this.setSession(response)));
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/register`, data);
  }

  token(): string | null {
    return this.user()?.token ?? null;
  }

  logout(): void {
    this.user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  private setSession(response: AuthResponse): void {
    this.user.set(response);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(response));
    }
  }

  private restoreSession(): AuthResponse | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) {
      return null;
    }

    try {
      const session = JSON.parse(stored) as AuthResponse;
      if (session.token) {
        return session;
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}
