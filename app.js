// packages
const bodyParser = require("body-parser");
const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

// imports
const env = require("dotenv").config();
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

// env vars and constants
const port = "44441";
const { MONGO_USER, MONGO_PASSWORD, APP_DB } = process.env;

// bootstrap
const app = express();

try {
  mongoose.connect(`
    mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-xswl0.azure.mongodb.net/${APP_DB}?retryWrites=true&w=majority`,
    { 
      useNewUrlParser: true
    }
  );
  app.listen(port);
  console.log(`Server listening on port ${port}, connected to database`);
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
  console.log(`Application serving JSON`);
} catch (err) {
  console.error(`couldn't connect to server. Error: ${err}`);
  throw new Error(err);
}