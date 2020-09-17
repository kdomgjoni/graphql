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
  bookDetailsId;
  queryBooks;


  constructor(private apollo: Apollo) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          books{
            name
            id
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


  bookDetails(id){
    this.bookDetailsId = id;
    this.apollo
      .watchQuery({
        query: gql`
        query($id: ID){
          book(id: $id){
            id
            name
            genre
            author{
              id
              name
              age
              books{
                name
                id
              }
            }
          }
        }
        `,
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
