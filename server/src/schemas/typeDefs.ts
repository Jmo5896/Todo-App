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
  id: ID
  task: String
  completed: Int
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
    createTodo(task: String!): Todo
    changeTodoOrder(todos: [ID]): String
    toPending(todoId: ID): User
    undoPending(todoId: ID): User
    completeTask(todoId: ID): User
  }
`;

export default typeDefs;
