import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore } from '@angular/fire/firestore';
import { Observable, Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  constructor(private firestore: Firestore) { }

  private publicacionesCollectionRef = collection(getFirestore(), 'publicaciones');


  //Este metodo me sirve para mostrar el perfil del usuario
  getAllPublicaciones(): Observable<any[]> {
    return new Observable<any[]>((observer: Observer<any[]>) => {
      const publicaciones: any[] = [];

      // Obtener todas las publicaciones
      getDocs(this.publicacionesCollectionRef).then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const idUsuario = data['idUsuario'];
          const idPublicaion = doc.id; // Obtener el ID del documento
          // Utilizar notación de índice

          // Obtener información del usuario por su UID
          const auth = getAuth();
          onAuthStateChanged(auth, user => {
            if (user && user.uid === idUsuario) {
              // Agregar información del usuario a la publicación
              publicaciones.push({
                idPublicaion: idPublicaion,
                downloadURL: data['downloadURL'],
                userEmail: user.email,
                // Otros campos de la publicación
              });

              // Notificar a los suscriptores que se ha actualizado la lista de publicaciones
              observer.next(publicaciones);
            }
          });
        });
      });
    });
  }
  eliminarPublicacion(idPublicacion: string, nombreColeccion: string) {
    const documentRef = doc(this.firestore, nombreColeccion, idPublicacion);
    
    return deleteDoc(documentRef)
      .then(() => console.log('Publicación eliminada exitosamente'))
      .catch(error => console.error('Error al eliminar la publicación', error));
  }


  correoUsuarioAutentificado(): Observable<string | null> {
    const auth = getAuth();
    const user = auth.currentUser;
    return of(user ? user.email : null);
  }

}
