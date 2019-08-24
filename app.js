require("dotenv").config();
// packages
const bodyParser = require("body-parser");
const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require ('cors');
const isAuth = require('./middlewares/isAuthenticated');

// imports
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

// env vars and constants
const port = "44441";
const { MONGO_USER, MONGO_PASSWORD, APP_DB } = process.env;

const app = express();

mongoose.connect(`
  mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-xswl0.azure.mongodb.net/${APP_DB}?retryWrites=true&w=majority`,
  { 
    useNewUrlParser: true
  }
).then(good => {
  app.listen(port);
  console.log(`Server listening on port ${port}, connected to database`);
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    return next();
  });
  // app.use(cors({
  //   origin: 'http://localhost:3000'
  // }));
  app.use(isAuth);
  app.use(
    "/graphql",
    graphqlHttp({
      schema: graphQLSchema,
      rootValue: graphQLResolvers,
      graphiql: true,
    })
  );
  console.log(`Graphql api established at endpoint: '/graphql'`);
  app.use(
    bodyParser.json()
  );
  console.log(`CORS-enabled Application serving JSON`);
}).catch(err => {
  console.error(`couldn't connect to server. Error: ${err}`);
})