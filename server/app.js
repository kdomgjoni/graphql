const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


const app = express();

// connect to mlab database

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://krist:AoVjYlKMafRP8LjB@cluster0.bnfo8.gcp.mongodb.net/graphql?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening for request on port 4000');
})