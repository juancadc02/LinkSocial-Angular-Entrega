import { ChangeDetectorRef, Component } from '@angular/core';
import { Publicaciones } from 'src/app/Modelos/publicaciones';
import { PublicacionService } from 'src/app/Servicios/publicacion.service';

@Component({
  selector: 'app-subir-publicaciones',
  templateUrl: './subir-publicaciones.component.html',
  styleUrls: ['./subir-publicaciones.component.css']
})
export class SubirPublicacionesComponent {
 
  publicacion: Publicaciones = {
    idPublicaion: '', // Dejar en blanco para que Firestore genere automáticamente
    idUsuario: '', // Puedes obtener esto según tu lógica de autenticación
    fchPublicacion: new Date(),
    contenidoPublicacion: '',
    pieFoto: ''
  };

  fotoSeleccionada: File | null = null;

  constructor(private publicacionesService: PublicacionService) { }

  async onSubmit() {
    if (this.fotoSeleccionada && this.publicacion.pieFoto) {
      try {
        await this.publicacionesService.agregarPublicacion(this.publicacion, this.fotoSeleccionada, this.publicacion.pieFoto);
        // Limpiar el formulario o realizar otras acciones después de la subida exitosa
      } catch (error) {
        // Manejar el error
        console.error('Error al agregar la publicación:', error);
      }
    } else {
      // Manejar caso cuando no se ha seleccionado una foto o no hay pie de foto
      console.error('Debe seleccionar una foto y agregar un pie de foto para completar la publicación.');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fotoSeleccionada = file;
  }
}

