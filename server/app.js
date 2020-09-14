const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


const app = express();

// connect to mlab database

mongoose.connect("mongodb+srv://krist:test123@cluster0.bnfo8.gcp.mongodb.net/graphql?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});



app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening for request on port 4000');
})