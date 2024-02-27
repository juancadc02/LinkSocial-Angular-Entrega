import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../Modelos/usuario';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth,private db :Firestore,private router:Router) {}

  

  iniciarSesion(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
    
  }

  registroEmail(email: string, password: string, usuario: Usuario) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const user = userCredential.user;
          const uid = user.uid;
          usuario.idUsuarios = uid;
          this.registroUsuario(uid, usuario);
          console.log('Usuario registrado y datos guardados con éxito');
  
          // Muestra SweetAlert para notificar éxito y redirige a la página de inicio de sesión
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Usuario registrado y datos guardados con éxito.',
            confirmButtonText: 'OK'
          }).then(() => {
            
            this.router.navigate(['/iniciarSesion']);
          });
        } else {
          console.error('Error: El usuario no se ha creado correctamente.');
        }
      })
      .catch((error) => {
       
        console.error('Error al registrar usuario en Firestore: ', error);
      });
  }

  registroUsuario(uid: string, usuarios: Usuario) {
    const usuarioReferencia = collection(this.db, 'usuarios');
    const usuarioDoc = doc(usuarioReferencia, uid);
    return setDoc(usuarioDoc, usuarios);
  }

  cerrarSesion() {
    console.log('Cerrando sesión...');
    localStorage.removeItem('likes');
    return this.auth.signOut();
  }

  
  obtenerEstadoUsuario() {
    return this.auth.authState;
  }

  //Metodo que envia correo para la recuperacion de contraseña.
  recuperacionDeContrasena(email: string) {
    return this.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Correo de recuperación enviado con éxito.');
        // Puedes redirigir a una página de confirmación o mostrar un mensaje al usuario.
      })
      .catch((error) => {
        console.error('Error al enviar el correo de recuperación: ', error);
        alert(error.message);
      });
  }



}
