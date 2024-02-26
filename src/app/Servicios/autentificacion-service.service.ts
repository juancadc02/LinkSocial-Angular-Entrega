import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionServiceService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    
  }


 async verificarRolAccesoAdmin(): Promise<boolean> {
   try {
     const user = await this.afAuth.currentUser;
 
     if (user) {
       // Obtén la información del usuario desde Firestore
       const userData = await this.getUserData(user.uid);
 
       // Verifica si el rol de acceso es "admin"
       if (userData && userData.rolAcceso === 'admin') {
         return true; // Usuario tiene rol de acceso "admin"
       }
     }
 
     // Si no tiene acceso, redirige a la página de inicio y muestra el mensaje
     this.mostrarErrorYRedirigir();
 
     return false;
   } catch (error) {
     console.error('Error al verificar el rol de acceso:', error);
     return false;
   }
 }

 // Cambia el tipo de retorno de getUserData
 private async getUserData(uid: string): Promise<any> {
   try {
     const firestore = getFirestore();
     const userDoc = doc(firestore, 'usuarios', uid);
     const userDataSnapshot = await getDoc(userDoc);

     if (userDataSnapshot.exists()) {
       // Si el documento existe, devolver sus datos
       return userDataSnapshot.data();
     } else {
       // Si el documento no existe, puedes devolver un objeto vacío o null, según tus necesidades
       return null;
     }
   } catch (error) {
     console.error('Error al obtener la información del usuario:', error);
     throw error; // Puedes propagar el error si lo deseas
   }
 }

 async verificarAutenticacion(): Promise<boolean> {
   const user = await this.afAuth.currentUser;
   return !!user; // Devuelve true si el usuario está autenticado, de lo contrario, false
 }


 private mostrarErrorYRedirigir(): void {
   // Muestra el mensaje de error con SweetAlert2
   Swal.fire({
     title: 'Error en la autenticación',
     text: 'Para navegar esta página, tienes que ser admin.',
     icon: 'error',
     confirmButtonText: 'OK'
   }).then(() => {
     // Redirige a la página de inicio
     this.router.navigate(['/paginaInicio']);
   });
 }
}
