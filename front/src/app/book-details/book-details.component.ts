import { Component, OnInit, Input, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  @Input() bookDetailsQuery: string;

  constructor(private apollo: Apollo) {

   }

  ngOnInit() {
  }




}

