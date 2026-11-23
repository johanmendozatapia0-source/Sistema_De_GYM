import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly loginMode = signal<'login' | 'register'>('login');
  form = { nombre: '', email: '', password: '' };

  constructor() {
    effect(() => {
      if (this.auth.user()) {
        void this.router.navigate(['/dashboard']);
      }
    });
  }

  submit(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    const isLogin = this.loginMode() === 'login';
    const request = isLogin
      ? this.auth.login({
          email: this.form.email,
          password: this.form.password,
        })
      : this.auth.register({
          nombre: this.form.nombre,
          email: this.form.email,
          password: this.form.password,
        });

    request.subscribe({
      next: () => {
        this.loading.set(false);
        if (isLogin) {
          void this.router.navigate(['/dashboard']);
          return;
        }

        this.form.nombre = '';
        this.form.password = '';
        this.loginMode.set('login');
        this.successMessage.set(
          'Tu cuenta se creó correctamente. Inicia sesión para continuar.',
        );
      },
      error: (error: unknown) => {
        this.errorMessage.set(this.describeError(error));
        this.loading.set(false);
      },
    });
  }

  toggleMode(): void {
    this.loginMode.update((mode) => (mode === 'login' ? 'register' : 'login'));
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private describeError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'No se pudo conectar con la API. Comprueba que el backend esté activo en http://localhost:8080.';
      }
      if (typeof error.error === 'string' && error.error.trim()) {
        return error.error;
      }
      const message = error.error?.message ?? error.error?.error;
      return typeof message === 'string'
        ? message
        : `No se pudo ${this.loginMode() === 'login' ? 'iniciar sesión' : 'crear la cuenta'} (HTTP ${error.status}).`;
    }
    return 'Ocurrió un error inesperado. Inténtalo de nuevo.';
  }
}
