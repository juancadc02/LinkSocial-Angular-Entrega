import { Injectable } from '@angular/core';
import { User, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DocumentSnapshot, Timestamp, addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Publicaciones } from '../Modelos/publicaciones';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
 
 
  constructor(private auth: AngularFireAuth, private router: Router) {}
 
 
  //Metodo para subir una nueva publicacion.
  async agregarPublicacion(publicacion: Publicaciones, foto: File, pieFoto: string): Promise<void> {
    try {
      // Subir la foto a Storage
      const storage = getStorage();
      const storageRef = ref(storage, `carpeta-fotos/${Date.now()}_${foto.name}`);
      await uploadBytes(storageRef, foto);

      // Obtener la URL de la foto subida
      const downloadURL = await getDownloadURL(storageRef);

      // Obtener el UID del usuario actual
      const user = await this.auth.currentUser;
      if (user) {
        const uid = user.uid;

        // Crear documento en Firestore
        const db = getFirestore();
        const publicacionesCollectionRef = collection(db, 'publicaciones');

        // Agregar la nueva publicación a Firestore
        const newPublicacionRef = await addDoc(publicacionesCollectionRef, {
          idUsuario: uid,
          fchPublicacion: Timestamp.fromDate(new Date()),
          contenidoPublicacion: `Texto de la publicación - ${downloadURL}`,
          pieDeFoto: pieFoto,
          downloadURL: downloadURL
        });

        // Obtener el ID del documento recién creado
        const idPublicaion = newPublicacionRef.id;
  
        // Actualizar el documento con el ID obtenido
        await updateDoc(newPublicacionRef, { idPublicaion: idPublicaion });

        console.log('Nueva publicación agregada con ID:', newPublicacionRef.id);

        Swal.fire({
          title: "Éxito",
          text: "Publicación subida correctamente",
          icon: "success",
          confirmButtonText: "Aceptar"
        }).then(() => {
          // Navegar a la página de inicio
          this.router.navigate(['/paginaInicio']);  // Ajusta la ruta según la configuración de tu enrutador
        });
      } else {
        console.error('No hay un usuario autenticado');
        // Manejar el caso en el que no hay usuario autenticado
      }
    } catch (error) {
      console.error('Error al agregar la publicación:', error);
      throw error;
    }
  }
  //Referencia de coleccion publicaciones
  private publicacionesCollectionRef = collection(getFirestore(), 'publicaciones');

  //Metodo para obtener todas las publicaciones y cargarlas en la pagina de inicio
  obtenerTodasLasPublicacionesDeLaPaginaInicio(): Observable<any[]> {
    return new Observable<any[]>((observer: Observer<any[]>) => {
        const publicaciones: any[] = [];

        // Obtener todas las publicaciones
        getDocs(this.publicacionesCollectionRef).then(async (snapshot) => {
            for (const doc of snapshot.docs) {
                const data = doc.data();

                // Obtener idUsuario, nombre de usuario, URL de descarga y pie de foto
                const idUsuario = data['idUsuario'];
                const nombreUsuario = await this.obtenerCorreoElectronicoPorIdUsuario(idUsuario);
                const downloadURL = data['downloadURL'];
                const pieDeFoto = data['pieDeFoto'];

                // Agregar al array de publicaciones con nombre de usuario e ID
                publicaciones.push({ idUsuario, nombreUsuario, downloadURL, pieDeFoto, idPublicacion: doc.id });
            }

            // Notificar a los suscriptores que se ha actualizado la lista de publicaciones
            observer.next(publicaciones);
        });
    });
}

//Referencia de coleccion usuarios
private usuariosCollectionRef = collection(getFirestore(), 'usuarios');

 // Nuevo método para obtener el nombre del usuario por ID
obtenerCorreoElectronicoPorIdUsuario(idUsuario: string): Promise<string> {
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