import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BuscarUsuariosService } from 'src/app/Servicios/buscar-usuarios.service';
import { SeguidoresService } from 'src/app/Servicios/seguidores.service';

@Component({
  selector: 'app-perfil-usuario-buscado',
  templateUrl: './perfil-usuario-buscado.component.html',
  styleUrls: ['./perfil-usuario-buscado.component.css']
})
export class PerfilUsuarioBuscadoComponent {
  public uid: string | null = null;
  public publicaciones$: Observable<any[]> = of([]);
  public userEmail: string | null = null;
  public esSeguido: boolean = false;

  public numeroSeguidos =0;
  public numeroSeguidores =0;

  constructor(
    private buscarUsuarioService: BuscarUsuariosService,
    private seguidoresService: SeguidoresService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.uid = this.route.snapshot.paramMap.get('id');
    
    if (this.uid !== null) {
      // Obtener información del usuario
      this.buscarUsuarioService.getUserInfo(this.uid).subscribe(
        (user) => {
          this.userEmail = user.correoElectronico;
        }
      );

      // Obtener publicaciones del usuario
      this.publicaciones$ = this.buscarUsuarioService.getAllPublicaciones(this.uid);

      // Verificar si el usuario actual sigue al usuario del perfil
      this.esSeguido = await this.seguidoresService.verificarSeguimiento(this.uid);

         // Obtener el número de seguidores
         this.seguidoresService.numeroSeguidos(this.uid).subscribe(
          (numeroSeguidos) => {
            this.numeroSeguidos = numeroSeguidos;
          }
        );
         // Obtener el número de seguidores
         this.seguidoresService.numeroSeguidores(this.uid).subscribe(
          (numeroSeguidores) => {
            this.numeroSeguidores = numeroSeguidores;
          }
        );
      
    } else {
      console.error('UID is null.');
    }
  }
  toggleSeguirDejarDeSeguir() {
    if (this.uid !== null) {
      if (this.esSeguido) {
        // Dejar de seguir al usuario
        this.seguidoresService.dejarDeSeguirUsuario(this.uid).then(() => {
          this.esSeguido = false;
        });
      } else {
        // Seguir al usuario
        this.seguidoresService.seguirUsuario(this.uid).then(() => {
          this.esSeguido = true;
        });
      }
    }
  }
}
