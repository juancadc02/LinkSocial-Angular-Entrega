import { Component } from '@angular/core';
import { FirebaseService } from './Servicios/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LinkSocial-Entrega';

constructor(private servicioFirebase:FirebaseService,private router:Router){}


isLoginPage(): boolean {
  return this.router.url === '/iniciarSesion' || this.router.url === '/registrarUsuario' || this.router.url==='/recuperacion' ;
}


  cerrarSesion() {
    this.servicioFirebase.cerrarSesion()
      .then(() => {
        // Cierre de sesión exitoso, redirigir a la página de inicio
        this.router.navigate(['/iniciarSesion']);
      })
      .catch(error => {
        // Manejar el error si es necesario
        console.error("Error al cerrar sesión:", error);
      });
  }
}
