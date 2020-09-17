import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {NgForm} from '@angular/forms';


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

  constructor(private apollo: Apollo) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          authors{
            name
            id
          }
        }
        `
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
      mutation: gql`
        mutation($name: String!, $genre: String!, $authorId: ID!){
          addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
          }
        }
      `,
      variables: {
        name: f.form.value.name,
        genre: f.form.value.genre,
        authorId: f.form.value.authorId
      },
      refetchQueries: [{ query: gql`
      {
        books{
          name
        }
      }
      ` }]
    })
    .subscribe(data => console.log(data));
  }



}
