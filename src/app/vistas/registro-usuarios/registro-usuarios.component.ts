import { Component, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/Modelos/usuario';
import { FirebaseService } from 'src/app/Servicios/firebase.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent {

  mensajeError: string = '';
  mensaje?: string;
  fotoPerfilBase64: string | undefined;

  @ViewChild('password') passwordInput!: ElementRef;
  @ViewChild('confirmPassword') confirmPasswordInput!: ElementRef;

  contrasenasCoinciden = true;

  constructor(private servicioFirebase: FirebaseService) {}

  registrarUsuario(email: string, password: string, nombreCompleto: string, movilUsuario: string, fchNacimiento: string, fotoPerfilBase64?: string) {
    // Verificar si las contraseñas coinciden
    const passwordValue = this.passwordInput.nativeElement.value;
    const confirmPasswordValue = this.confirmPasswordInput.nativeElement.value;

    this.contrasenasCoinciden = passwordValue === confirmPasswordValue;

    if (!this.contrasenasCoinciden) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    this.mensajeError = ''; // Limpiar el mensaje de error

    const nuevoUsuario: Usuario = {
      nombreCompleto: nombreCompleto,
      correoElectronico: email,
      movilUsuario: movilUsuario,
      contrasena: password,
      fchRegistro: new Date().toISOString(),
      fchNacimiento: fchNacimiento,
      rolAcceso: 'basico'
    };

    this.servicioFirebase.registroEmail(email, password, nuevoUsuario);
  }
}
