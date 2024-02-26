import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publicaciones } from 'src/app/Modelos/publicaciones';
import { PerfilUsuarioService } from 'src/app/Servicios/perfil-usuario.service';

@Component({
  selector: 'app-perfil-usuario-sesion',
  templateUrl: './perfil-usuario-sesion.component.html',
  styleUrls: ['./perfil-usuario-sesion.component.css']
})
export class PerfilUsuarioSesionComponent {

  //Lo inicializo en vacio
  public publicaciones$: Observable<any[]> = of([]);

  constructor(private perfilServicio: PerfilUsuarioService) { }

  ngOnInit(): void {
    this.publicaciones$ = this.perfilServicio.getAllPublicaciones();
    this.publicaciones$.subscribe(data => console.log('Publicaciones:', data));

  }

   //Metodo de confirmacion de eliminar una cita.
   confirmarEliminar(publicacion: Publicaciones) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la cita con id: ${publicacion.idPublicaion}?`);
    if (confirmacion) {
      this.eliminarUsuario(publicacion);
    }
  }
  eliminarUsuario(publicacion: Publicaciones) {
    // Verificamos si idPublicaion es una cadena antes de usarlo
    if (publicacion.idPublicaion !== undefined) {
      console.log('ID de la publicación a eliminar:', publicacion.idPublicaion);
      this.perfilServicio.eliminarPublicacion(publicacion.idPublicaion, "publicaciones");
      location.reload();
    } else {
      console.error('ID de la publicación no definido');
    }
  }
  
}