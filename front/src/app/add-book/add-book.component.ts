import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  authors;

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

}
