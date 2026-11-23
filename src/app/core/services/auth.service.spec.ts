import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environment/environment';
import { AuthResponse } from '../models/auth.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  const response: AuthResponse = {
    token: 'test-token',
    tipo: 'Bearer',
    id: 1,
    nombre: 'Alex Rivera',
    email: 'alex@example.com',
    rol: 'admin',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('does not start an authenticated session after registration', () => {
    service
      .register({
        nombre: response.nombre,
        email: response.email,
        password: 'password123',
      })
      .subscribe();

    const request = httpTesting.expectOne(`${environment.apiUrl}/auth/register`);
    request.flush(response);

    expect(service.user()).toBeNull();
    expect(service.token()).toBeNull();
  });

  it('starts an authenticated session after login', () => {
    service.login({ email: response.email, password: 'password123' }).subscribe();

    const request = httpTesting.expectOne(`${environment.apiUrl}/auth/login`);
    request.flush(response);

    expect(service.user()).toEqual(response);
    expect(service.token()).toBe(response.token);
  });
});
