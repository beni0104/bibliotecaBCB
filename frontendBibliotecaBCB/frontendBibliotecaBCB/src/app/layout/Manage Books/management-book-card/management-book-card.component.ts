import { Component, Input, Output, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../../../interfaces/book';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../services/encryption.service';

interface deletePair{
  id: number;
  selected: boolean;
}

@Component({
  selector: 'app-management-book-card',
  templateUrl: './management-book-card.component.html',
  styleUrl: './management-book-card.component.css'
})
export class ManagementBookCardComponent {
  @Input() book!: Book;
  @Output() selectionChange = new EventEmitter<deletePair>();

  constructor(private router: Router,
              private encryptionService: EncryptionService,
              private translate: TranslateService,
              @Inject(PLATFORM_ID) private platformId: Object) {
                if (isPlatformBrowser(this.platformId)) {
                  const browserLang = translate.getBrowserLang();
                  const userLang = localStorage.getItem('userLang') ?? browserLang;
                  translate.use(userLang || '');
                }
              }


  goToEdit(book: Book) {
    const encryptedId = this.encryptionService.encrypt(book.id.toString());
    this.router.navigate(['/home/editbook'], { queryParams: { id: encryptedId }});
  }

  onCheckboxChange(event: any): void {
    // const deletePair: deletePair = { id: this.book.id, selected: event.target.checked};
    this.selectionChange.emit({ id: this.book.id, selected: event.target.checked});
  }
}
