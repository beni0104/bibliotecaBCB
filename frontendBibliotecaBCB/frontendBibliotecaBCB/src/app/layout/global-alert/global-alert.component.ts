import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.css']
})
export class GlobalAlertComponent implements OnInit, OnDestroy {
  alertMessage: string | null = null;
  private alertSubscription: Subscription = new Subscription();

  constructor(private alertService: AlertService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.alertService.alertMessage.subscribe((message: string | null) => {
      this.alertMessage = message;
    });
  }

  closeAlert() {
    this.alertService.clearTimeout();
    this.alertService.alertMessage.next(null);
    // this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }
}
