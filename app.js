const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const _ = require ("lodash");

const Event = require("./models/event");
const User = require('./models/user');

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
        schema: buildSchema (`
            type Event {
                _id: ID!,
                title: String!,
                description: String!,
                cost: Float!,
                start_time: String!,
                end_time: String!,
            },

            type User {
              _id: ID!,
              email: String!,
              password: String
            }

            input EventInput {
                title: String!,
                description: String!,
                cost: Float!,
                start_time: String!,
                end_time: String!,
            },

            input UserInput {
              email: String!,
              password: String!
            }

            type RootQuery {
                events: [Event!]!
                users: [User!]!
            },

            type RootMutation {
                createEvent(event: EventInput): Event
                createUser(user: UserInput): User
            },

            schema {
                query: RootQuery,
                mutation: RootMutation
            },
        `),
      rootValue: {
        events: () => {
          return Event.find()
            .then(events => events.map(event => ({ ...event._doc })))
            .catch(err => {
              throw new Error(err);
            });
        },
        createEvent: args => {
          const event = new Event({
            title: args.event.title,
            cost: args.event.cost,
            start_time: args.event.start_time,
            end_time: args.event.end_time,
            description: args.event.description,
            createdBy: "5d4cfb8092114f1bb9c9b807" // dummy user to be removed later
          });
          let createdEvent = {};
          return event
            .save()
            .then(result => {
              // return { ...result._doc };
              createdEvent = { ...result._doc };
              return User.findById('5d4cfb8092114f1bb9c9b807')
            })
            .then(user => {
              if (!user) {
                throw new Error (`no user ${user} found for event: ${event}`);
              }
              user.createdEvents.push(event);
              return user.save();
            })
            .then(event => {
              return createdEvent;
            })
            .catch(err =>  {
              console.log(`failed to save ${event}: Error: ${err}}`);
              throw new Error(err);
          });
        },
        users: () => {
          return User.find()
            .then(users => users.map(user => (_.omit({ ...user._doc }, 'password'))))
            .catch(err => {throw new Error()})
        },
        createUser: args => {
          return User.findOne({email: args.user.email})
          .then(found => {
            if(found) {
              throw new Error(`user with ${args.user.email} already exists`);
            }
            return bcrypt.hash(args.user.password, 12)
          })
          .then(hashed => {
            const user = new User({
              email: args.user.email,
              password: hashed,
            });
            return user
              .save()
              .then(result => {
                return _.omit({ ...result._doc }, 'password');
              })
              .catch(err =>  {
                console.log(`failed to save ${user}: Error: ${err}}`);
                throw new Error(err);
            });
          })
          .catch(err => {throw new Error (err)})
        }
      },
    graphiql: true,
  })
);