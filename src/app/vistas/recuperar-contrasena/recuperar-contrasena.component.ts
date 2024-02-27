import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {


  

  constructor(private servicioFirebase :FirebaseService){}

  recuperarContrasena(email:string){

    this.servicioFirebase.recuperacionDeContrasena(email)
    .then(() => {
      console.log('Correo recuperacion enviado con exito.');
      Swal.fire({
        title: "Exito!",
        text: "Correo enviado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
    })
    .catch((error) => {
      // Password recovery failed
      console.log(' Error al enviar correo recuperacion.');
      Swal.fire({
        title: "Error!",
        text: "Error al enviar el correo de recuperacion",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    });
  }


  
}
