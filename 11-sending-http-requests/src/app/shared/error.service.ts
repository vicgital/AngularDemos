import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error = signal('');

  error = this._error.asReadonly();

  showError(message: string) {
    console.log(message);
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    this._error.set(message);
  }

  clearError() {
    this._error.set('');
  }
}
