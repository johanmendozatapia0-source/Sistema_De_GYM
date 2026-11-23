import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly currentTitle = signal('Resumen');

  readonly navigation = [
    { path: '/dashboard', label: 'Resumen', icon: '⌂' },
    { path: '/socios', label: 'Socios', icon: '♧' },
    { path: '/membresias', label: 'Membresías', icon: '◈' },
    { path: '/pagos', label: 'Pagos', icon: '$' },
    { path: '/acceso', label: 'Control de acceso', icon: '↗' },
    { path: '/entrenadores', label: 'Entrenadores', icon: '♙' },
    { path: '/rutinas', label: 'Rutinas', icon: '▤' },
  ];

  constructor() {
    this.updateTitle();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }

  private updateTitle(): void {
    const currentPath = this.router.url.split('?')[0];
    this.currentTitle.set(
      this.navigation.find((item) => item.path === currentPath)?.label ??
        'Resumen',
    );
  }
}
