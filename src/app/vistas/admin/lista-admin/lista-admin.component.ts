import { Component } from '@angular/core';
import { Usuario } from 'src/app/Modelos/usuario';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-lista-admin',
  templateUrl: './lista-admin.component.html',
  styleUrls: ['./lista-admin.component.css']
})
export class ListaAdminComponent {

  constructor(private servicioFirebase: FirebaseService, private servicioUsuarios:UsuariosService){}

  listaUsuarios:Usuario[]=[];
  usuarios:Usuario[]=[]

  columnas: string[] = ['nombreCompleto', 'correoElectronico', 'fchNacimiento', 'movilUsuario', 'rolAcceso', 'acciones'];

  ngOnInit(){
    this.servicioUsuarios.listarUsuarios().subscribe(res=>this.listaUsuarios=res);
  }

  
}
