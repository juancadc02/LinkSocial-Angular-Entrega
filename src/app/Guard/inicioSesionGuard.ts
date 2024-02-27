// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutentificacionServiceService } from '../Servicios/autentificacion-service.service';

@Injectable({
  providedIn: 'root',
})
export class inicioSesionGuard implements CanActivate {
  constructor(private authService: AutentificacionServiceService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const isUserAuthenticated = await this.authService.verificarAutenticacion();

      if (isUserAuthenticated) {
        return true; // Permite el acceso a la ruta si el usuario está autenticado
      } else {
        // Redirige a la página de inicio de sesión si el usuario no está autenticado
        this.router.navigate(['/iniciarSesion']);
        return false;
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return false;
    }
  }
}