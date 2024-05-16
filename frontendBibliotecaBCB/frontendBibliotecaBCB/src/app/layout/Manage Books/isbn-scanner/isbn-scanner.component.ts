import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Quagga from 'quagga';

@Component({
  selector: 'app-isbn-scanner',
  templateUrl: './isbn-scanner.component.html',
  styleUrls: ['./isbn-scanner.component.css']
})
export class IsbnScannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') video!: ElementRef;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && navigator.mediaDevices) {
      this.startScanner();
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.stopScanner();
    }
  }

  startScanner() {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: this.video.nativeElement,
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment'
        }
      },
      decoder: {
        readers: ['ean_reader'] // 'ean_reader' for ISBN-13
      }
    }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      console.log('Barcode detected and processed : [' + code + ']');
      this.stopScanner();
      alert('Scanned ISBN: ' + code);
      // Call a function to handle the scanned ISBN code
      this.handleScannedISBN(code);
    });
  }

  stopScanner() {
    Quagga.stop();
  }

  handleScannedISBN(isbn: string) {
    // Add your logic to handle the scanned ISBN code here
    console.log('Handling ISBN: ' + isbn);
  }
}
