import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Publicaciones } from 'src/app/Modelos/publicaciones';
import { PerfilUsuarioService } from 'src/app/Servicios/perfil-usuario.service';
import { SeguidoresService } from 'src/app/Servicios/seguidores.service';

@Component({
  selector: 'app-perfil-usuario-sesion',
  templateUrl: './perfil-usuario-sesion.component.html',
  styleUrls: ['./perfil-usuario-sesion.component.css']
})
export class PerfilUsuarioSesionComponent {

  //Lo inicializo en vacio
  public publicaciones$: Observable<any[]> = of([]);


  numeroDeSeguidores =0;
  numeroDeSeguidos =0;
  constructor(private perfilServicio: PerfilUsuarioService,private servicioSeguidores: SeguidoresService) { }

  ngOnInit(): void {
    this.publicaciones$ = this.perfilServicio.getAllPublicaciones();
    this.publicaciones$.subscribe(data => console.log('Publicaciones:', data));

    // Obtener la instancia de autenticación
    const auth = getAuth();

    // Observar cambios en el estado de autenticación
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado, ahora puedes obtener su información
        const userId = user.uid;

        // Llamar a tus funciones para obtener el número de seguidos y seguidores
        this.servicioSeguidores.numeroSeguidos(userId).subscribe((seguidos) => {
          this.numeroDeSeguidos = seguidos;
        });

        this.servicioSeguidores.numeroSeguidores(userId).subscribe((seguidores) => {
          this.numeroDeSeguidores = seguidores;
        });
      } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
      }
    });
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
