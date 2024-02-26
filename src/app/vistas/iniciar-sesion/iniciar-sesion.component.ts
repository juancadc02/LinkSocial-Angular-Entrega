import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/Servicios/firebase.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {

  mostrarError: boolean = false; // Variable para controlar la visibilidad del mensaje de error
  mostrarMensaje: boolean = false;

  mensajeSesionCerrada: string = '';
  private subscription: Subscription = new Subscription();
    constructor(private servicioFirebase:FirebaseService,private router :Router){}
  
  
  ngOnDestroy() {
    // Importante: Desuscríbete para evitar pérdida de memoria
    this.subscription.unsubscribe();
  }

  iniciarSesion(email: string, password: string) {
    this.servicioFirebase.iniciarSesion(email, password)
      .then(() => {
        // Inicio de sesión exitoso, redirigir a la página de inicio
        this.router.navigate(['/paginaInicio']);
      })
      .catch(error => {
        // Manejar el error y mostrar el mensaje de error
        console.error("Error al iniciar sesión:", error);
        this.mostrarError = true;
      });
  }
  
  
  cerrarError(): void {
    this.mostrarError = false;
  }
}
