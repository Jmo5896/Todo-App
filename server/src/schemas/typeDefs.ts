const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    todos: [Todo]
  }

  type Todo {
  _id: ID
  task: String
  completed: Number
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
