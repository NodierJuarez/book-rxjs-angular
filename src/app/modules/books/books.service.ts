import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, tap } from "rxjs";
import { IBook } from "./interfaces/book.interface";

@Injectable()
export class BooksService {

  private _book: BehaviorSubject<IBook | null> = new BehaviorSubject<IBook | null>(null);
  private _books: BehaviorSubject<IBook[] | null> = new BehaviorSubject<IBook[] | null>(null);

  constructor(
    private _httpClient: HttpClient
  ) { }

  get book$(): Observable<IBook | null> {
    return this._book.asObservable();
  }

  get books$(): Observable<IBook[] | null> {
    return this._books.asObservable();
  }

  getBooks(): Observable<IBook[]> {
    return this._httpClient.get<IBook[]>('http://localhost:3000/books')
      .pipe(
        map(books => {
          this._books.next(books);
          return books;
        })
      );
  }

  createBook(book: IBook): Observable<any> {
    return this._httpClient.post<IBook>('http://localhost:3000/books', book).pipe(map(res => {
      return res;
    }));
  }

  deleteBook(id: number): Observable<any> {
    return this._httpClient.delete<IBook>(`http://localhost:3000/books/${id}`).pipe(
      switchMap(() => {
        return this.getBooks().pipe(
          tap({
            next: (event) => { return event },
            error: (error: HttpErrorResponse) => { throw error; }
          })
        );
      })
    );
  }
  


}