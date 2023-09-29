import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksFormComponent } from './books-form/books-form.component';
import { BooksComponent } from './books.component';
import { BooksResolver } from './books.resolver';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: '',
        component: BooksListComponent,
        resolve: {
          books: BooksResolver
        }
      },
      {
        path: 'new-book',
        component: BooksFormComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
