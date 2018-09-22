import { State, Mutation, Resolve, Context } from '@loona/angular';
import gql from 'graphql-tag';

export class AddUser {
  static mutation = gql`
    mutation addUser($id: ID!, $name: string) {
      addUser(id: $id, name: $name) @client {
        id
        name
      }
    }
  `;

  constructor(
    public variables: {
      id: string;
      name: string;
    },
  ) {}
}

export const GET_USERS_QUERY = gql`
  query getUsers {
    users @client {
      id
      name
    }
  }
`;

export const GET_USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) @client {
      id
      name
    }
  }
`;

@State({
  defaults: {
    users: [],
  },
})
export class HomeState {
  @Mutation(AddUser)
  addUser(args, { patchQuery }: Context) {
    const newUser = {
      id: args.id,
      name: args.name,
      __typename: 'User',
    };

    patchQuery(GET_USERS_QUERY, data => {
      data.users.push(newUser);
    });

    return newUser;
  }

  @Resolve('Query.user')
  user(_, { id }, { cache, getCacheKey }: Context) {
    const fragment = gql`
      fragment user on User {
        id
        name
      }
    `;
    return cache.readFragment({
      fragment,
      id: getCacheKey({ id, __typename: 'User' }),
    });
  }
}
