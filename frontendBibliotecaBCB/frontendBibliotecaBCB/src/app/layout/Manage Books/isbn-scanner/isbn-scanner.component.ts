import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, switchMap, catchError } from 'rxjs';
import { Book } from '../../../interfaces/book';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
  selector: 'app-isbn-scanner',
  templateUrl: './isbn-scanner.component.html',
  styleUrls: ['./isbn-scanner.component.css']
})
export class IsbnScannerComponent implements OnInit {
  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @Output() dataEmitter: EventEmitter<Book> = new EventEmitter<Book>();
  scannedIsbn: string = '';
  foundData: boolean = false;
  fetchedBookData: Book | undefined;
  fetchStatusMessage: string = 'fetching-book-data';
  private reader = new BrowserMultiFormatReader();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.startCamera();
  }

  ngOnDestroy(): void {
    this.video.nativeElement.pause();
    this.video.nativeElement.srcObject = null;
  }

  startCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        })
        .catch(err => {
          console.error('Error accessing the camera:', err);
        });
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }
  }

  capturePhotoAndScan(): void {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    canvas.width = this.video.nativeElement.videoWidth;
    canvas.height = this.video.nativeElement.videoHeight;

    context?.drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/png');
    this.reader.decodeFromImageUrl(imageDataUrl)
      .then(result => {
        this.scannedIsbn = result.getText();
        this.fetchBookData(this.scannedIsbn);
      })
      .catch(err => {
        console.error('Error scanning the photo:', err);
      });
  }

  fetchBookData(isbn: string): void {
    this.fetchStatusMessage = 'fetching-book-data';
    const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const openLibraryApiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

    this.http.get(openLibraryApiUrl).pipe(
      switchMap((response: any) => {
        const data = response[`ISBN:${isbn}`];
        if (data) {
          return of({
            title: data.title,
            authors: data.authors ? data.authors.map((author: any) => author.name) : ['Unknown'],
            categories: data.subjects ? data.subjects.map((subject: any) => subject.name) : [],
            imageLinks: data.cover ? { thumbnail: data.cover.medium } : null,
            averageRating: data.rating || 0
          });
        } else {
          return this.http.get(googleApiUrl).pipe(
            switchMap((googleData: any) => {
              return of(googleData.items ? googleData.items[0].volumeInfo : null);
            })
          );
        }
      }),
      catchError(error => {
        this.fetchStatusMessage = 'error-fetching-book-data';
        return of(null);
      })
    ).subscribe(bookData => {
      if (bookData) {
        this.fetchStatusMessage = 'book-data-found';
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
        this.foundData = true;

      } else {
        this.fetchStatusMessage = 'no-data-found-for-isbn';
      }
    });
  }

  submit(): void {
    if (this.fetchedBookData) {
      this.dataEmitter.emit(this.fetchedBookData);
    }
  }
}
