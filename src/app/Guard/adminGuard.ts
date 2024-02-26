// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutentificacionServiceService } from '../Servicios/autentificacion-service.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AutentificacionServiceService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const hasAdminAccess = await this.authService.verificarRolAccesoAdmin();

    if (hasAdminAccess) {
      return true; // Permite el acceso a la ruta "admin"
    } else {
      return false; // Redirige a otra página si no tiene acceso
    }
  }
}