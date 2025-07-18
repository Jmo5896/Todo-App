import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const ADD_USER = gql`
 mutation AddUser($input: UserInput!) {
  addUser(input: $input) {
    token
  }
}
`;

export const CREATE_TODO = gql`
mutation CreateTodo($task: String!) {
  createTodo(task: $task) {
    completed
    id
    task
  }
}
`;

export const UPDATE_TODO_ORDER = gql`
mutation ChangeTodoOrder($todos: [ID]) {
  changeTodoOrder(todos: $todos)
}
`;

export const TO_PENDING = gql`
mutation ToPending($todoId: ID) {
  toPending(todoId: $todoId) {
    todos {
      _id
      id
      task
      completed
    }
  }
}
`;

export const UNDO_PENDING = gql`
mutation UndoPending($todoId: ID) {
  undoPending(todoId: $todoId) {
    todos {
      _id
      id
      task
      completed
    }
  }
}
`;

export const COMPLETE_TASK = gql`
mutation CompleteTask($todoId: ID) {
  completeTask(todoId: $todoId) {
    todos {
      _id
      id
      task
      completed
    }
  }
}
`;