import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateServiceService {

  private hasUploaded = false;

  getHasUploaded(): boolean {
    return this.hasUploaded;
  }

  setHasUploaded(value: boolean): void {
    this.hasUploaded = value;
  }
}
