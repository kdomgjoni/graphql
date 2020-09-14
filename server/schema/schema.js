const graphql = require('graphql');
const _ = require('lodash');

// dummy data
var books = [
    { name: 'Fluent Forever', genre: 'Self-help book', id: '1', 'authorId': '1'},
    { name: 'Why we sleep', genre: 'Science book', id: '2', 'authorId': '2'},
    { name: 'Elon Musk', genre: 'Biography', id: '3', 'authorId': '3'}
];

var authors = [
    { name: 'Gabriel', age: 44, id: '1'},
    { name: 'Matthew', age: 42, id: '2'},
    { name: 'Ashlee', age: 46, id: '3'}
];

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db/other soure
                return _.find(books, { id: args.id });
            }
        },
        auhtor: {
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})