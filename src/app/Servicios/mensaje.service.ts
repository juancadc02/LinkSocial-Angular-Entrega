import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private mensajeSource = new BehaviorSubject<string>('');
  mensajeActual = this.mensajeSource.asObservable();

  actualizarMensaje(mensaje: string) {
    this.mensajeSource.next(mensaje);
  }
}
