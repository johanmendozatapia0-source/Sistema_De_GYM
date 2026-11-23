import { HttpErrorResponse } from '@angular/common/http';

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'No se pudo conectar con el servidor. Verifica que la API esté activa en http://localhost:8080.';
    }
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }
    const message = error.error?.message ?? error.error?.error;
    return typeof message === 'string'
      ? message
      : `La solicitud falló (HTTP ${error.status}).`;
  }
  return 'Ocurrió un error inesperado. Inténtalo de nuevo.';
}
