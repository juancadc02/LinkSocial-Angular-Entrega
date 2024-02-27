import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable, map, of } from 'rxjs';
import { Publicaciones } from 'src/app/Modelos/publicaciones';
import { PerfilUsuarioService } from 'src/app/Servicios/perfil-usuario.service';
import { SeguidoresService } from 'src/app/Servicios/seguidores.service';

@Component({
  selector: 'app-perfil-usuario-sesion',
  templateUrl: './perfil-usuario-sesion.component.html',
  styleUrls: ['./perfil-usuario-sesion.component.css']
})
export class PerfilUsuarioSesionComponent {

  public publicaciones$: Observable<any[]> = of([]);
  numeroDeSeguidores = 0;
  numeroDeSeguidos = 0;
  userEmail: string | null = null;

  mensajeNoHayPublicaciones='No hay publicaciones'
  constructor(private perfilServicio: PerfilUsuarioService, private servicioSeguidores: SeguidoresService) { }

  ngOnInit(): void {
    this.perfilServicio.correoUsuarioAutentificado().subscribe(
      (correo) => {
        console.log('Correo del usuario:', correo);
        this.userEmail = correo;

        if (correo) {
          this.publicaciones$ = this.perfilServicio.getAllPublicaciones();
          this.publicaciones$.subscribe(
            (data) => console.log('Publicaciones:', data),
            (error) => console.error('Error al obtener publicaciones:', error)
          );

          // Obtener el número de seguidos y seguidores
          const auth = getAuth();
          onAuthStateChanged(auth, (user) => {
            if (user) {
              const userId = user.uid;
              this.servicioSeguidores.numeroSeguidos(userId).subscribe((seguidos) => {
                this.numeroDeSeguidos = seguidos;
              });

              this.servicioSeguidores.numeroSeguidores(userId).subscribe((seguidores) => {
                this.numeroDeSeguidores = seguidores;
              });
            } else {
              console.log('Usuario no autenticado');
            }
          });

        } else {
          console.log('Usuario no autenticado');
        }
      },
      (error) => console.error('Error al obtener correo del usuario autenticado:', error)
    );
  }

  confirmarEliminar(publicacion: Publicaciones) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar la cita con id: ${publicacion.idPublicaion}?`);
    if (confirmacion) {
      this.eliminarUsuario(publicacion);
    }
  }

  eliminarUsuario(publicacion: Publicaciones) {
    if (publicacion.idPublicaion !== undefined) {
      console.log('ID de la publicación a eliminar:', publicacion.idPublicaion);
      this.perfilServicio.eliminarPublicacion(publicacion.idPublicaion, "publicaciones")
        .then(() => {
          // Eliminar la publicación de la lista local
          this.publicaciones$ = this.publicaciones$.pipe(
            map(publicaciones => publicaciones.filter(pub => pub.idPublicaion !== publicacion.idPublicaion))
          );
        })
        .catch(error => console.error('Error al eliminar la publicación', error));
    } else {
      console.error('ID de la publicación no definido');
    }
  }
}
