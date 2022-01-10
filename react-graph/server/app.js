const express = require('express');
const schema = require('./schema/schema.js')
const app = express();
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors')

const mongoose = require('mongoose')

// allow cross origin
app.use(cors());

// connect to mlab database

mongoose.connect('mongodb+srv://shaun:test123@cluster0.lxim5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{console.log('connected to database')})

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql:true }));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');