import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './vistas/iniciar-sesion/iniciar-sesion.component';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { RegistroUsuariosComponent } from './vistas/registro-usuarios/registro-usuarios.component';
import { SubirPublicacionesComponent } from './vistas/subir-publicaciones/subir-publicaciones.component';
import { AdminComponent } from './vistas/admin/admin.component';
import { DetalleAdminComponent } from './vistas/admin/detalle-admin/detalle-admin.component';
import { AdminGuard } from './Guard/adminGuard';
import { PerfilUsuarioSesionComponent } from './vistas/perfil-usuario-sesion/perfil-usuario-sesion.component';
import { BuscarUsuariosComponent } from './vistas/buscar-usuarios/buscar-usuarios.component';
import { PerfilUsuarioBuscadoComponent } from './vistas/buscar-usuarios/perfil-usuario-buscado/perfil-usuario-buscado.component';
import { RecuperarContrasenaComponent } from './vistas/recuperar-contrasena/recuperar-contrasena.component';
import { inicioSesionGuard } from './Guard/inicioSesionGuard';

const routes: Routes = [
  {path: '', redirectTo: '/iniciarSesion', pathMatch: 'full' }, 
  {path: 'iniciarSesion', component: IniciarSesionComponent },
  {path:'registrarUsuario',component:RegistroUsuariosComponent},
  {path: 'paginaInicio', component: PaginaInicioComponent ,canActivate:[inicioSesionGuard]},
  {path:'subirPublicacion',component:SubirPublicacionesComponent,canActivate:[inicioSesionGuard]},
  {path:'admin',component:AdminComponent,canActivate: [AdminGuard] },
  {path:'admin/:id',component:DetalleAdminComponent,canActivate: [AdminGuard] },
  {path:'perfil',component:PerfilUsuarioSesionComponent,canActivate:[inicioSesionGuard]},
  {path:'buscarUsuario',component:BuscarUsuariosComponent,canActivate:[inicioSesionGuard]},
  {path:'perfilUsuarioBuscado/:id',component:PerfilUsuarioBuscadoComponent,canActivate:[inicioSesionGuard]},
  {path:'recuperar-contrasena',component:RecuperarContrasenaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
