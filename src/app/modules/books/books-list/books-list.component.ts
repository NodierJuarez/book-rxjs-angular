import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IBook } from '../interfaces/book.interface';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'author', 'publishedData', 'actions'];
  dataSource = new MatTableDataSource<IBook>();
  // books$: Observable<IBook[] | null> = of(null);
  books$: Observable<IBook[] | null> = of(null);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  
  constructor(
    private _booksService: BooksService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this._booksService.books$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(books => {
        if (books !== null) {
          this.isLoadingResults = false;
          this.dataSource.data = books;
        }
      })
  }

  newBook() {
    this.router.navigateByUrl("/books/new-book");
  }

  deleteBook(bookId:number) {

    let sub = this._booksService.deleteBook(bookId).subscribe(res => {
      this._snackBar.open("Book deleted", "Done", { duration: 5000 } );
      sub.unsubscribe();
    });

  }
}


