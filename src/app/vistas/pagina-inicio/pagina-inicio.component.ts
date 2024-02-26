import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Likes } from 'src/app/Modelos/like';
import { ComentariosService } from 'src/app/Servicios/comentarios.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { LikeService } from 'src/app/Servicios/like.service';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent {

  publicaciones: any[] = [];
  likes: string[] = [];
  nuevosComentarios: { [key: string]: string } = {};

  constructor(private servicioFirebase: FirebaseService,
    private router: Router,
    private servicioPublicacion: PublicacionService,
    private servicioLike:LikeService,
    private servicioComentarios:ComentariosService) { }

  ngOnInit() {
    // Comprobar el estado de la sesión en el inicio del componente
    this.servicioFirebase.obtenerEstadoUsuario().subscribe(user => {
      if (!user) {
        // No hay un usuario autenticado, redirigir al componente de inicio de sesión
        this.router.navigate(['/iniciarSesion']);
      }
    });

    //Obtenemos todas las publicaciones y las guardamos en el array publicaciones
    this.servicioPublicacion.obtenerTodasLasPublicacionesDeLaPaginaInicio().subscribe(publicaciones => {
      this.publicaciones = publicaciones;
  
      this.publicaciones.forEach(publicacion => {
        this.nuevosComentarios[publicacion.idPublicacion] = '';
  
        //Obtenemos todos los comentarios y los guardamos en el array de comentarios
        this.servicioComentarios.obtenerComentariosDePublicacionPorId(publicacion.idPublicacion).subscribe(comentarios => {
          publicacion.comentarios = comentarios;
  
          publicacion.comentarios.forEach(async (comentario: any) => {
            comentario.nombreUsuario = await this.servicioComentarios.obtenerCorreoUsuarioPorSuId(comentario.idUsuario);
          });
        });
      });
  
      this.cargarLikes(); // Agrega esta línea para cargar los likes al inicializar
    });
    
  }



  //Metodo para agregar un comentario a una publicacion especifica por el id
  async agregarComentario(idPublicacion: string) {
    const uidUsuario = await this.servicioComentarios.obtenerUsuarioActual();

    if (uidUsuario && this.nuevosComentarios[idPublicacion]?.trim() !== '') {
      const nuevoComentario = {
        idUsuario: uidUsuario,
        idPublicacion: idPublicacion,
        contenidoComentario: this.nuevosComentarios[idPublicacion],
        fchComentario: new Date().toISOString(),
      };

      this.servicioComentarios.agregarComentario(nuevoComentario).then(() => {
        this.nuevosComentarios[idPublicacion] = '';
        this.router.navigate(['/paginaInicio']);
      });
    }
  }

  //Metodo que comprueba si el usuario a dado me gusta o no para saber que hacer si agregar o eliminar.
  async toggleLike(idPublicacion: string) {
    const uidUsuario = await this.servicioLike.obtenerUsuarioActual();

    if (uidUsuario) {
      const yaLeGusta = this.publicacionLeGusto(idPublicacion);

      if (yaLeGusta) {
        await this.eliminarLike(idPublicacion);
      } else {
        await this.darLike(idPublicacion);
      }
    }
  }

  publicacionLeGusto(idPublicacion: string): boolean {
    return this.likes.includes(idPublicacion);
  }

  //Metodo para dar me gusta
  async darLike(idPublicacion: string) {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uidUsuario = user.uid;

        const nuevoLike: Likes = {
          idUsuarioQueDa: uidUsuario,
          idPublicacion: idPublicacion,
          fchLike: new Date(),
        };

        if (!this.publicacionLeGusto(idPublicacion)) {
          this.likes.push(idPublicacion);
        }

        this.servicioLike.agregarLike(nuevoLike).then(() => {
          // Puedes realizar alguna acción adicional después de dar like
        });
      }
    });
  }

  //Metodo para eliminar me gusta
  async eliminarLike(idPublicacion: string) {
    const auth = getAuth();

    try {
      const user = auth.currentUser;

      if (user) {
        const uidUsuario = user.uid;

        await this.servicioLike.eliminarLike(uidUsuario, idPublicacion);

        this.likes = this.likes.filter(id => id !== idPublicacion);
      } else {
        console.log('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  }

  //Metodo para cargar los likes del usuario que ha iniciado sesion para que se cargen cuando se carga la pagina de inicio
  async cargarLikes() {
    const uidUsuario = await this.servicioLike.obtenerUsuarioActual();
  
    if (uidUsuario) {
      this.publicaciones.forEach(async (publicacion) => {
        const tieneLike = await this.servicioLike.tieneLike(uidUsuario, publicacion.idPublicacion);
        if (tieneLike) {
          this.likes.push(publicacion.idPublicacion);
        }
      });
    }
  }
}


