import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BooksService } from '../service/books.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})



export class BookListComponent implements OnInit {

  @ViewChild('book-list', { static: true }) bookList: ElementRef;

  books;
  bookDetailsId;
  queryBooks;


  constructor(private apollo: Apollo, private bookService: BooksService) {
    this.apollo
      .watchQuery({
        query: this.bookService.getBook
      })
      .valueChanges.subscribe(result => {
        this.books = result.data.books;
      });
   }


  ngOnInit() {

  }


  bookDetails(id){
    this.bookDetailsId = id;
    this.apollo
      .watchQuery({
        query: this.bookService.showBook(id),
        variables: {
          id: this.bookDetailsId
        }
      })
      .valueChanges.subscribe(result => {
        this.queryBooks = result.data.book.author.books;
        console.log(result.data)
      });
  }



}
