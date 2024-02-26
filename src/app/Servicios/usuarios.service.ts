import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, collectionData, deleteDoc, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private fat: AngularFireAuth,
    private router:Router,
    private ngZone: NgZone,
    private db: Firestore
    ) { }

  //Metodo para la pagina de administracion.
  modificarUsuarios(objeto:any,nombreColecion:string,idUsuarios:string){
    const referencia=doc(this.db,nombreColecion+"/"+idUsuarios);
    return setDoc(referencia,objeto);
  }
  listarUsuarios():Observable<Usuario[]>{
    const listarUsuarios =collection(this.db,'usuarios');
    return collectionData(listarUsuarios,{idField:'id'}) as Observable<Usuario[]>;
  }

  mostrarUsuarioPorId(nombreCollecion:string,idUsuarios:string){
    const nombreColeccion=doc(this.db,nombreCollecion+"/"+idUsuarios);
    return docData(nombreColeccion, {idField:"id"}) as Observable<any>;
  }
 
 
}


