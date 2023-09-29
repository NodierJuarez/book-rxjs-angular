import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from '../interfaces/book.interface';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent {
  bookForm: FormGroup;
  onProgressSave = false;

  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _bookService: BooksService,
    private _snackBar: MatSnackBar
    ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date();
    
    this.bookForm = this.fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      publishedDate: [null, Validators.required]
    });

  }

  updatePublishedDate(value: any) {
    this.bookForm.get('publishedDate')?.setValue(value);
  }

  goToBack() {
    this.router.navigate(['/books'] );
  }

  saveBook() {
    let book: IBook = this.bookForm.value;
    this.onProgressSave = true;

    let sub = this._bookService.createBook(book).subscribe(res => {
      this.onProgressSave = false;
      this._snackBar.open("Book saved", "Done", { duration: 5000 } );
      this.router.navigate(['/books'] ).finally( () => sub.unsubscribe() )
    });
  }

}
