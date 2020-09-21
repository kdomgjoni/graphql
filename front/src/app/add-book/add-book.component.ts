import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {NgForm} from '@angular/forms';
import { BooksService } from '../service/books.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  authors;
  name = '';
  genre = '';
  authorId;

  constructor(private apollo: Apollo, private bookService: BooksService) {
    this.apollo
      .watchQuery({
        query: this.bookService.getAuthors
      })
      .valueChanges.subscribe(result => {
        this.authors = result.data.authors;
      });
   }

  ngOnInit() {
  }

  changeAuthor(e){
    this.authorId = e.target.value;
  }

  submit(f: NgForm, e){
    e.preventDefault();
    console.log(f);

    this.apollo.mutate({
      mutation: this.bookService.addBook,
      variables: {
        name: f.form.value.name,
        genre: f.form.value.genre,
        authorId: f.form.value.authorId
      },
      refetchQueries: [{ query: this.bookService.getBooks }]
    })
    .subscribe(data => console.log(data));
  }



}
