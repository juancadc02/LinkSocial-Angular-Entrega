import { Component } from '@angular/core';
import { BuscarUsuariosService } from 'src/app/Servicios/buscar-usuarios.service';

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.component.html',
  styleUrls: ['./buscar-usuarios.component.css']
})
export class BuscarUsuariosComponent {
  userEmail: string = '';
  user: any;

  constructor(private servicioBuscarUsuario:BuscarUsuariosService) {}

  async searchUser() {
    try {
      const userId = await this.servicioBuscarUsuario.getUserIdByEmail(this.userEmail);
      if (userId) {
        // Obtener más detalles del usuario si es necesario y asignarlos a `this.user`

        // Muestra el correo electrónico debajo del botón de búsqueda
        this.user = { correoElectronico: this.userEmail, uid: userId };
      } else {
        console.log('Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
    }
  }
}
