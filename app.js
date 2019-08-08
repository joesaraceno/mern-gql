const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

const events = [
    
];

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
            createEvent: ({event}) => {
                const input = {
                    _id: getRandomArbitrary(1, 2).toString(),
                    title: event.title,
                    cost: event.cost,
                    start_time: event.start_time,
                    end_time: event.end_time,
                    description: event.description 
                };
                events.push(input);
                return input;
            },
        },
        graphiql: true,
    })
);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

app.listen("44441");