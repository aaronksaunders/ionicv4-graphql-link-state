import { Apollo, gql } from 'apollo-angular-boost';
export default {

  defaults: {
    users: [
      { "id": "100", "name":"Aaron", "__typename" :"User" },
      { "id": "101", "name":"Andrea", "__typename" :"User" }
    ]
  },
  resolvers: {
    Query: {
    },
    Mutation: {
    }
  }
}
//
// QUERIES
//

