import { Component, OnInit } from '@angular/core';
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
  bookk: Observable<any>;

  constructor(private apollo: Apollo) { }


  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          authors{
            age
            name
          }
        }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log(result.data);
      });
  }



}
