import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Seguidores } from '../Modelos/seguidores';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SeguidoresService {

  constructor(private db: Firestore, private auth: AngularFireAuth) { }

  async seguirUsuario(idUsuarioSeguido: string): Promise<DocumentReference<Seguidores>> {
    const user = await this.auth.currentUser;
    
    if (user) {
      const idUsuarioSeguidor = user.uid;
      const seguimiento: Seguidores = {
        idSeguidorSolicitud: idUsuarioSeguidor,
        idSeguidorRecibido: idUsuarioSeguido,
        fchSeguimiento: new Date()
      };

      const docRef = await addDoc(collection(this.db, 'seguidores'), this.convertirASeguidoresFirestore(seguimiento));
      Swal.fire({
        title: "Has seguido al usuario",
        text: "Seguimiento con exito",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
      return docRef;

      
    } else {
      throw new Error('No hay usuario autenticado.');
    }
  }

  async dejarDeSeguirUsuario(idUsuarioSeguido: string): Promise<void> {
    const user = await this.auth.currentUser;

    if (user) {
      const idUsuarioSeguidor = user.uid;

      const q = query(collection(this.db, 'seguidores'), 
        where('idSeguidorSolicitud', '==', idUsuarioSeguidor),
        where('idSeguidorRecibido', '==', idUsuarioSeguido)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        Swal.fire({
          title: "Has dejado de seguir al usuario",
          text: "Dejar de seguir con exito",
          icon: "success",
          confirmButtonText: "Aceptar"
        });
      });
    } else {
      throw new Error('No hay usuario autenticado.');
    }
  }

  private convertirASeguidoresFirestore(seguidores: Seguidores): any {
    return {
      idSeguidorSolicitud: seguidores.idSeguidorSolicitud,
      idSeguidorRecibido: seguidores.idSeguidorRecibido,
      fchSeguimiento: seguidores.fchSeguimiento
    };
  }

  async verificarSeguimiento(idUsuarioSeguido: string): Promise<boolean> {
    const user = await this.auth.currentUser;

    if (user) {
      const idUsuarioSeguidor = user.uid;

      const q = query(collection(this.db, 'seguidores'), 
        where('idSeguidorSolicitud', '==', idUsuarioSeguidor),
        where('idSeguidorRecibido', '==', idUsuarioSeguido)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Si se encontró un documento, lo eliminamos y devolvemos true
       
        return true;
      } else {
        // Si no se encontró ningún documento, devolvemos false
        return false;
      }
    } else {
      throw new Error('No hay usuario autenticado.');
    }
  }

  private firestore = getFirestore();

  numeroSeguidos(id: string): Observable<number> {
    const q = query(collection(this.firestore, 'seguidores'), where('idSeguidorSolicitud', '==', id));

    return from(getDocs(q)).pipe(
      map((querySnapshot: QuerySnapshot) => querySnapshot.size)
    );
  }

  numeroSeguidores(id: string): Observable<number> {
    const q = query(collection(this.firestore, 'seguidores'), where('idSeguidorRecibido', '==', id));

    return from(getDocs(q)).pipe(
      map((querySnapshot: QuerySnapshot) => querySnapshot.size)
    );
  }
}
