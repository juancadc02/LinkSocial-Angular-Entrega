import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { IniciarSesionComponent } from './vistas/iniciar-sesion/iniciar-sesion.component';
import { RegistroUsuariosComponent } from './vistas/registro-usuarios/registro-usuarios.component';
import { PaginaInicioComponent } from './vistas/pagina-inicio/pagina-inicio.component';
import { environment } from 'src/environments/environments';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubirPublicacionesComponent } from './vistas/subir-publicaciones/subir-publicaciones.component';
import { AdminComponent } from './vistas/admin/admin.component';
import { DetalleAdminComponent } from './vistas/admin/detalle-admin/detalle-admin.component';
import { ListaAdminComponent } from './vistas/admin/lista-admin/lista-admin.component';
import { PerfilUsuarioSesionComponent } from './vistas/perfil-usuario-sesion/perfil-usuario-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistroUsuariosComponent,
    PaginaInicioComponent,
    SubirPublicacionesComponent,
    AdminComponent,
    DetalleAdminComponent,
    ListaAdminComponent,
    PerfilUsuarioSesionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    FormsModule,
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
