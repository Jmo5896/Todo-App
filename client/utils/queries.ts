import { gql } from '@apollo/client';

export const QUERY_ME = gql`
 query Me {
  me {
    _id
    email
    username
    todos {
      _id
      task
      completed
    }
  }
}
`;
