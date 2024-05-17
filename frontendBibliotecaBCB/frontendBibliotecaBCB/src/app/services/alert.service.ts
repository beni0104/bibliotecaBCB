import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alertMessage: BehaviorSubject<{ message: string | null, type: string }> = new BehaviorSubject<{ message: string | null, type: string }>({ message: null, type: 'success' });
  private timeoutRef: any = null; // Store the timeout reference

  constructor() { }

  showAlert(message: string, type: string, duration: number): void {
    this.clearTimeout(); // Clear any existing timeout
    this.alertMessage.next({ message, type });

    this.timeoutRef = setTimeout(() => {
      this.alertMessage.next({ message: null, type });
    }, duration);
  }

  clearTimeout(): void {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
      this.timeoutRef = null;
    }
  }
}
