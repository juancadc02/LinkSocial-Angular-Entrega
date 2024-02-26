import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosService {

  constructor(private afAuth: AngularFireAuth,private db : Firestore) {}

  //Metodo para buscar el usuarios por el correo electronico y obtener solo el idUsuario.
 async getUserIdByEmail(correoElectronico: string): Promise<string | null> {
   const firestore = getFirestore();
   const q = query(collection(firestore, 'usuarios'), where('correoElectronico', '==', correoElectronico));
   const querySnapshot = await getDocs(q);
 
   if (!querySnapshot.empty) {
     // Devuelve el idUsuario del primer documento encontrado
     return querySnapshot.docs[0].id;
   } else {
     // Devuelve null si no se encontró ningún usuario con el correo electrónico dado
     return null;
   }
 }
 
 private publicacionesCollectionRef = collection(getFirestore(), 'publicaciones');
 
 // Método para obtener todas las publicaciones de un usuario específico
 getAllPublicaciones(idUsuario: string): Observable<any[]> {
   return this.obtenerCorreoPorId(idUsuario).pipe(
     switchMap(correoElectronico => {
       const publicaciones: any[] = [];
 
       // Construir la consulta para obtener las publicaciones del usuario específico
       const q = query(this.publicacionesCollectionRef, where('idUsuario', '==', idUsuario));
 
       // Obtener las publicaciones que cumplen con la consulta
       return from(getDocs(q)).pipe(
         map(snapshot => {
           snapshot.forEach(doc => {
             const data = doc.data();
 
             // Agregar información de la publicación al array, incluyendo el correo electrónico
             publicaciones.push({
               downloadURL: data['downloadURL'],
               correoElectronico: correoElectronico,
               // Otros campos de la publicación
             });
           });
 
           return publicaciones;
         })
       );
     })
   );
 }
 
 obtenerCorreoPorId(idUsuario: string): Observable<string> {
   const firestore = getFirestore();
   const usuarioRef = doc(firestore, 'usuarios', idUsuario);
 
   return from(getDoc(usuarioRef)).pipe(
     // Puedes ajustar el mapeo según la estructura de tu base de datos
     map((snapshot) => {
       const usuario = snapshot.data() as Usuario;
       return usuario.correoElectronico;
     })
   );
 }
 
 getUserInfo(uid: string): Observable<any> {
   const q = query(collection(this.db, 'usuarios'), where('uid', '==', uid));
   return new Observable((observer) => {
     getDocs(q).then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         observer.next(doc.data());
       });
       observer.complete();
     }).catch((error) => {
       observer.error(error);
     });
   });
 }
}
