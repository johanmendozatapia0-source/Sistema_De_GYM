import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { NavbarComponent } from './shared/navbar/navbar.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((module) => module.Login),
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (module) => module.Dashboard,
          ),
      },
      {
        path: 'socios',
        loadComponent: () =>
          import('./features/socios/socios.component').then(
            (module) => module.Socios,
          ),
      },
      {
        path: 'membresias',
        loadComponent: () =>
          import('./features/membresias/membresias.component').then(
            (module) => module.Membresias,
          ),
      },
      {
        path: 'pagos',
        loadComponent: () =>
          import('./features/pagos/pagos.component').then(
            (module) => module.Pagos,
          ),
      },
      {
        path: 'acceso',
        loadComponent: () =>
          import('./features/acceso/acceso.component').then(
            (module) => module.AccesoPage,
          ),
      },
      {
        path: 'entrenadores',
        loadComponent: () =>
          import('./features/entrenadores/entrenadores.component').then(
            (module) => module.Entrenadores,
          ),
      },
      {
        path: 'rutinas',
        loadComponent: () =>
          import('./features/rutinas/rutinas.component').then(
            (module) => module.Rutinas,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
