import { Component, ViewChild, Inject, PLATFORM_ID, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import Quagga from 'quagga';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-isbn-scanner',
  templateUrl: './isbn-scanner.component.html',
  styleUrls: ['./isbn-scanner.component.css']
})
export class IsbnScannerComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;
  @Output() dataEmitter: EventEmitter<Book> = new EventEmitter<Book>();
  private isScanning: boolean = true;
  stoppedScanning: boolean = false;
  foundData: boolean = false;
  scannedIsbn: string = '';
  fetchedBookData: Book | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startScanner();
      window.scrollTo(0, 0);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      Quagga.stop();
    }
  }

  startScanner(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();

          Quagga.init({
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: this.video.nativeElement, // Or '#video' if you prefer
              constraints: {
                width: 640,
                height: 480,
                facingMode: 'environment'
              },
            },
            frequency: 5, // Increase scanning frequency
            decoder: {
              readers: ['ean_reader'], // ISBN-13 uses EAN-13 barcode
              multiple: false
            },
            locate: true, // Enable locating the barcode in the image
            numOfWorkers: 4 // Use multiple workers for better performance
          }, err => {
            if (err) {
              console.error('Quagga init error:', err);
              return;
            }
            Quagga.start();
            console.log('Quagga started successfully');
          });

          Quagga.onDetected(result => {
            if (this.isScanning) {
              const isbn = result.codeResult.code;
              console.log('ISBN detected:', isbn);
              this.scannedIsbn = isbn;
              this.fetchBookData(isbn);
              this.stopScanner();
            }
          });
        })
        .catch(err => {
          console.error('Error accessing the camera:', err);
        });
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }
  }
  
  

  fetchBookData(isbn: string): void {
    const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const openLibraryApiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

    this.http.get(openLibraryApiUrl).pipe(
      map((response: any) => {
        const data = response[`ISBN:${isbn}`];
        if (data) {
          return {
            title: data.title,
            authors: data.authors ? data.authors.map((author: any) => author.name) : ['Unknown'],
            categories: data.subjects ? data.subjects.map((subject: any) => subject.name) : [],
            imageLinks: data.cover ? { thumbnail: data.cover.medium } : null,
            averageRating: data.rating || 0
          };
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Error fetching book data from Open Library:', error);
        return of(null);
      }),
      switchMap(bookData => {
        if (bookData) {
          return of(bookData);
        } else {
          // Fetch from Google Books if Open Library fetch fails or returns no data
          return this.http.get(googleApiUrl).pipe(
            map((response: any) => response.items ? response.items[0].volumeInfo : null),
            catchError(error => {
              console.error('Error fetching book data from Google Books:', error);
              return of(null);
            })
          );
        }
      })
    ).subscribe(bookData => {
      if (bookData) {
        const title = bookData.title;
        const author = bookData.authors ? bookData.authors.join(', ') : 'Unknown';
        const imageUrl = bookData.imageLinks ? bookData.imageLinks.thumbnail : null;

        this.fetchedBookData = {
          "id": -1,
          "bookId": 0,
          "title": title,
          "author": author,
          "category": bookData.categories ? bookData.categories.join(', ') : '',
          "photoUrl": imageUrl,
          "amount": 1,
          "isFavorite": false,
          "rating": bookData.averageRating || 0
        };
        // Stop scanning after successful detection and fetching of book data
        this.foundData = true;
      } else {
        console.error('No data found for this ISBN.');
      }
    });
  }

  


  stopScanner(): void {
    console.log(this.fetchedBookData);
    this.isScanning = false;
    this.stoppedScanning = true;
    Quagga.stop();
    if (this.video.nativeElement.srcObject) {
      const stream = this.video.nativeElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.video.nativeElement.srcObject = null;
    }
    console.log('Scanner stopped');
  }

  restartScanner(): void {
    this.isScanning = true;
    this.stoppedScanning = false;
    this.startScanner();
  }

  submit(){
    this.dataEmitter.emit(this.fetchedBookData);
  }
}
