//Hosts GraphQL on ExpressJs Web Server

const express = require('express');
const expressGraphQL= require('express-graphql');
const cors=require('cors');
const schema= require('./schema');
const path = require('path');
const app= express();
app.use(cors());
app.use('/graphql', expressGraphQL({schema,graphiql:true}));
const PORT=5000;
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));
