import { gql } from '@apollo/client';

export const QUERY_ME = gql`
 query Me {
  me {
    email
    todos {
      completed
      id
      _id
      task
    }
    username
  }
}
`;
