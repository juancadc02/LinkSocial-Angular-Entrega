import { Injectable } from '@angular/core';
import { DocumentSnapshot, addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Comentarios } from '../Modelos/comentarios';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private afAuth: AngularFireAuth) {}


  //Metodo para añadir una comentario a una publicacion.
  async agregarComentario(comentario: Comentarios): Promise<void> {
    try {
      const firestore = getFirestore();
      // Agregar el comentario a la colección 'comentarios'
      const comentarioRef = await addDoc(collection(firestore, 'comentarios'), comentario);
      // Actualizar la publicación para incluir el ID del comentario en su lista de comentarios
      const publicacionDocRef = doc(firestore, 'publicaciones', comentario.idPublicacion);
      await updateDoc(publicacionDocRef, {
        comentarios: arrayUnion(comentarioRef.id),
      
      });
    } catch (error) {
      console.error('Error al agregar el comentario a Firestore:', error);
      throw error;
    }
  }
  
  //Metodo para obtener el id del usuario que tiene la sesion iniciada
  async obtenerUsuarioActual(): Promise<string | null> {
    const usuario = await this.afAuth.currentUser;
    return usuario ? usuario.uid : null;
  }

  //Referencia coleccion de comentarios
  private comentariosCollectionRef = collection(getFirestore(), 'comentarios');

  // Método para obtener comentarios por id de publicación
  obtenerComentariosDePublicacionPorId(idPublicacion: string): Observable<Comentarios[]> {
    return new Observable<Comentarios[]>((observer) => {
      const comentarios: Comentarios[] = [];

      // Obtener comentarios por id de publicación
      getDocs(this.comentariosCollectionRef).then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data() as Comentarios;
          if (data.idPublicacion === idPublicacion) {
            comentarios.push(data);
          }
        });

        // Notificar a los suscriptores que se ha actualizado la lista de comentarios
        observer.next(comentarios);
      });
    });
  }

  private usuariosCollectionRef = collection(getFirestore(), 'usuarios');

  // Nuevo método para obtener el nombre del usuario por ID
obtenerCorreoUsuarioPorSuId(idUsuario: string): Promise<string> {
  const usuarioRef = doc(this.usuariosCollectionRef, idUsuario);

  return new Promise((resolve, reject) => {
    getDoc(usuarioRef)
      .then((snapshot: DocumentSnapshot<any>) => {
        const data = snapshot.data();
        const nombre = data ? data['correoElectronico'] : '';
        resolve(nombre);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
}
