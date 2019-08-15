const { buildSchema } = require ("graphql");

module.exports = buildSchema(`
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

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

  type AuthData {
    userId: ID!,
    token: String!,
    tokenExpiration: Int!
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
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
  },

  type RootMutation {
    createEvent(event: EventInput): Event
    createUser(user: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  },

  schema {
    query: RootQuery,
    mutation: RootMutation
  },
`);