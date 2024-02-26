import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../Modelos/usuario';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth,private db :Firestore) {}

  

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
        } else {
          console.error('Error: El usuario no se ha creado correctamente.');
        }
      })
      .catch((error) => {
        alert(error.message);
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
    return this.auth.signOut();
  }

  
  obtenerEstadoUsuario() {
    return this.auth.authState;
  }
}
