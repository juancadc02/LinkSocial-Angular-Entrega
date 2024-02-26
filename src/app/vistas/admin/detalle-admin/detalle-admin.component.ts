import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/Modelos/usuario';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.component.html',
  styleUrls: ['./detalle-admin.component.css']
})
export class DetalleAdminComponent {

  usuarios:Usuario={nombreCompleto:'',correoElectronico:'',movilUsuario:'',contrasena:'',fchRegistro:'',fchNacimiento:'',rolAcceso:''};
  autorForm:FormGroup;
  id:string='';
  constructor(
    private db : Firestore,
    private forms: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private servicioFirebase:FirebaseService,
    private servicioUsuarios: UsuariosService)
    {
       this.autorForm=this.forms.group({
        nombreCompleto:['',Validators.required],
        correoElectronico:['',Validators.required],
        movilUsuario:['',Validators.required],
        contrasena:['',Validators.required],
        fchRegistro:['',Validators.required],
        fchNacimiento:['',Validators.required],
        rolAcceso:['',Validators.required]
        
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get("id")) {
      console.log('idUsuario:' + this.id);
  
      this.id = this.route.snapshot.paramMap.get("id")!;
      this.servicioUsuarios.mostrarUsuarioPorId('usuarios', this.id).subscribe(
        (res: any) => {
          console.log('Datos del usuario:', res);
          this.usuarios = res;
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }
  modificarAutor() {
    this.servicioUsuarios.modificarUsuarios(this.usuarios, 'usuarios', this.id!)
      .then(() => {
        console.log("Autor modificado correctamente");
        Swal.fire({
          title: 'Exito !',
          text: 'Usuario actializado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirige a la página de inicio
          this.router.navigate(['/admin']);
        });
      })
      .catch((error) => {
        console.log("Error, no se ha modificado el autor.", error);
      });
  }
}
