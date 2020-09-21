const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');




const app = express();

// allow cors origin request
app.use(cors());

// connect to mlab database

mongoose.connect("mongodb+srv://kristi:test123@cluster0.v6skk.mongodb.net/<graphql-test>?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

// mongodb+srv://kristi:<password>@cluster0.v6skk.mongodb.net/<dbname>?retryWrites=true&w=majority

//mongodb+srv://krist:test123@cluster0.bnfo8.gcp.mongodb.net/graphql?retryWrites=true&w=majority

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening for request on port 4000');
})