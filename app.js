const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const Event = require("./models/event");

const port = "44441";
const app = express();

app.use(bodyParser.json());

const events = [];



app.use(
    "/graphql",
    graphqlHttp({
        schema: buildSchema (`
            type Event {
                _id: ID!,
                title: String!,
                description: String!,
                cost: Float!,
                start_time: String!,
                end_time: String!,
            },

            input EventInput {
                title: String!,
                description: String!,
                cost: Float!,
                start_time: String!,
                end_time: String!,
            },

            type RootQuery {
                events: [Event!]! 
            },

            type RootMutation {
                createEvent(event: EventInput): Event
            },

            schema {
                query: RootQuery,
                mutation: RootMutation
            },
        `),
        rootValue: {
            events: () => {
                return events;
            },
            createEvent: args => {
                const event = new Event({
                    title: args.event.title,
                    cost: args.event.cost,
                    start_time: args.event.start_time,
                    end_time: args.event.end_time,
                    description: args.event.description 
                });
                return event
                  .save()
                  .then(result => {
                    console.log(`saved ${result}`);
                    return { ...result._doc };
                  })
                  .catch(err =>  {
                    console.log(`failed to save ${ev}: Error: ${err}}`);
                    throw new Error(err);
                });
            },
        },
        graphiql: true,
    })
);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
const { MONGO_USER, MONGO_PASSWORD, APP_DB } = process.env;

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
})
