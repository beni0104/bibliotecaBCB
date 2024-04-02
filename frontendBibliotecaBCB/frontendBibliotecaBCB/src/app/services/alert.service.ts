import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alertMessage: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private timeoutRef: any = null; // Store the timeout reference

  constructor() { }

  showAlert(message: string, duration: number): void {
    this.clearTimeout(); // Clear any existing timeout
    this.alertMessage.next(message);

    this.timeoutRef = setTimeout(() => {
      this.alertMessage.next(null);
    }, duration);
  }

  clearTimeout(): void {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
      this.timeoutRef = null;
    }
  }
}
