const { buildSchema } = require ("graphql");

module.exports = buildSchema(`
  type Event {
    _id: ID!,
    title: String!,
    description: String!,
    cost: Float!,
    start_time: String!,
    end_time: String!,
    createdBy: User!,
  },

  type User {
    _id: ID!,
    email: String!,
    password: String,
    createdEvents: [Event!],
  },

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
  },

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
`);