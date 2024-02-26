import { Injectable } from '@angular/core';
import { Firestore, addDoc, arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Likes } from '../Modelos/like';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LikeService {


  constructor(private db: Firestore, private auth: AngularFireAuth) { }


  //Metodo para dar me gusta a una publicacion.
  async agregarLike(like: Likes): Promise<void> {
    try {
      const likesCollection = collection(this.db, 'likes');
      await addDoc(likesCollection, like);
      console.log('Like agregado con éxito');
      Swal.fire({
        title: "Has dado like",
        text: "Like dado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
    } catch (error) {
      console.error('Error al agregar el like:', error);
    }
  }

  //Metodo para quitar me gusta de una publicacion
  async eliminarLike(idUsuario: string, idPublicacion: string): Promise<void> {
    try {
      const likesQuery = query(collection(this.db, 'likes'), where('idUsuarioQueDa', '==', idUsuario), where('idPublicacion', '==', idPublicacion));
      const likesSnapshot = await getDocs(likesQuery);

      if (!likesSnapshot.empty) {
        const likeId = likesSnapshot.docs[0].id;
        const likeDocRef = doc(this.db, 'likes', likeId);
        await deleteDoc(likeDocRef);
        console.log('Like eliminado con éxito');
        Swal.fire({
          title: "Has eliminado el like",
          text: "Like eliminado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar"
        });
      } else {
        console.log('No se encontró el like para eliminar');
      }
    } catch (error) {
      console.error('Error al eliminar el like:', error);
    }
  }

  //Metodo para comprobar si una publicacion ya tiene me gusta.
  async tieneLike(idUsuario: string, idPublicacion: string): Promise<boolean> {
    try {
      const likesQuery = query(
        collection(this.db, 'likes'),
        where('idUsuarioQueDa', '==', idUsuario),
        where('idPublicacion', '==', idPublicacion)
      );

      const likesSnapshot = await getDocs(likesQuery);

      return !likesSnapshot.empty;
    } catch (error) {
      console.error('Error al verificar si tiene like:', error);
      return false;
    }
  }


  //Metodo para obtener el id del usuario que tiene la sesion iniciada
  async obtenerUsuarioActual(): Promise<string | null> {
    const usuario = await this.auth.currentUser;
    return usuario ? usuario.uid : null;
  }

}
