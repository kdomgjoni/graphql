import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private apollo: Apollo) { }

  getAuthors = gql`
  {
    authors{
      name
      id
    }
  }
`;

  addBook = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
  `;

  getBooks = gql`
  {
    books{
      name
    }
  }
  `;

  getBook = gql`
  {
    books{
      name
      id
    }
  }
  `;

  showBook(id) {
    return gql`
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
  `;
  }
}

