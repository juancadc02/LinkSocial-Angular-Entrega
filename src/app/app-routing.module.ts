import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './vistas/iniciar-sesion/iniciar-sesion.component';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { RegistroUsuariosComponent } from './vistas/registro-usuarios/registro-usuarios.component';
import { SubirPublicacionesComponent } from './vistas/subir-publicaciones/subir-publicaciones.component';
import { AdminComponent } from './vistas/admin/admin.component';
import { DetalleAdminComponent } from './vistas/admin/detalle-admin/detalle-admin.component';
import { AdminGuard } from './Guard/adminGuard';

const routes: Routes = [
  { path: '', redirectTo: '/iniciarSesion', pathMatch: 'full' }, 
  { path: 'iniciarSesion', component: IniciarSesionComponent },
  {path:'registrarUsuario',component:RegistroUsuariosComponent},
  { path: 'paginaInicio', component: PaginaInicioComponent },
  {path:'subirPublicacion',component:SubirPublicacionesComponent},
  {path:'admin',component:AdminComponent,canActivate: [AdminGuard] },
  {path:'admin/:id',component:DetalleAdminComponent,canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
