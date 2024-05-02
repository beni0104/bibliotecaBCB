import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
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

  constructor(private alertService: AlertService,
              private cdRef: ChangeDetectorRef,
              private translate: TranslateService,
              @Inject(PLATFORM_ID) private platformId: Object) {
                if (isPlatformBrowser(this.platformId)) {
                  const browserLang = translate.getBrowserLang();
                  const userLang = localStorage.getItem('userLang') ?? browserLang;
                  translate.use(userLang || '');
                }
              }

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
