const graphql = require('graphql');
const _ = require('lodash');

// dummy data
var books = [
    { name: 'Fluent Forever', genre: 'Self-help book', id: '1'},
    { name: 'Why we sleep', genre: 'Science book', id: '2'},
    { name: 'Name of the Wind', genre: 'Biography', id: '3'}
];

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString}},
            resolve(parent, args){
                // code to get data from db/other soure
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})