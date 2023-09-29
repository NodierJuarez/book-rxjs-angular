import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { IBook } from "./interfaces/book.interface";
import { BooksService } from "./books.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";


export const BooksResolver: ResolveFn<IBook[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    booksService: BooksService = inject(BooksService)
): Observable<IBook[]> => booksService.getBooks()