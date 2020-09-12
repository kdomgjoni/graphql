const graphql = require('graphql');
const _ = require('lodash');

// dummy data
var books = [
    { name: 'Fluent Forever', genre: 'Self-help book', id: '1'},
    { name: 'Why we sleep', genre: 'Science book', id: '2'},
    { name: 'Elon Musk', genre: 'Biography', id: '3'}
];

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})