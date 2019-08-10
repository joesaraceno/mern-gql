const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const env = require("dotenv").config();
const mongoose = require("mongoose");

// const Event = require("./models/event");
// const User = require('./models/user');
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

const port = "44441";
const app = express();
const { MONGO_USER, MONGO_PASSWORD, APP_DB } = process.env;

app.use(bodyParser.json());

mongoose.connect(`
  mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-xswl0.azure.mongodb.net/${APP_DB}?retryWrites=true&w=majority
`,{useNewUrlParser: true})
.then (good => {
  app.listen(port);
  const { host } = good.connection;
  console.log(`Server listening on port ${port}, connected to database ${host}`);
})
.catch (err => {
  console.error(`couldn't connect to server. Error: ${err}`);
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
  })
);