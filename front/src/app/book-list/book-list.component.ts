import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})



export class BookListComponent implements OnInit {

  @ViewChild('book-list', { static: true }) bookList: ElementRef;

  books;

  constructor(private apollo: Apollo) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          books{
            name
          }
        }
        `
      })
      .valueChanges.subscribe(result => {
        this.books = result.data.books;
      });
   }


  ngOnInit() {

  }

  // displayBooks() {
  //   const data = this.books.data;

  //   if (data.loading) {
  //     return this.empty;
  //   } else {
  //     return data.books.map(book => {
  //       return (
  //         `<li>${book.name}</li>`
  //       );
  //     });
  //   }
  // }



}
