const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, World!")
});

app.use(bodyParser.json());


const eventResponse = [
    'sailing',
    'reading',
    'meetup',
    'hacking'
]

app.use(
    "/graphql",
    graphqlHttp({
        schema: buildSchema (`
            type RootQuery {
                events: [String!]!  
            },
            type RootMutation {
                createEvent(name: String): String
            },
            schema {
                query: RootQuery,
                mutation: RootMutation
            }
        `),
        rootValue: {
            events: () => {
                return eventResponse;
            },
            createEvent: (args) => {
                const {name} = args;
                return name;
            },
        },
        graphiql: true,
    })
);

app.listen("44441");