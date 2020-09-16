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
        console.log(this.authors);
      });
   }

  ngOnInit() {
  }

  changeAuthor(e){
    this.authorId = e.target.value;
  }

  submit(f: NgForm, e){
    console.log(e.preventDefault);
    console.log(f)
  }

}
