# ionicv4-graphql-link-state
Example showing how to manage state using graphql in local state


## Getting Started

go to your terminal and install the required dependencies.

```
npm install apollo-angular-boost graphql
```

We will setup the apollo client in the `app.module.ts`

```javascript
import { HttpClientModule } from "@angular/common/http";
import {
  ApolloBoostModule,
  ApolloBoost,
  InMemoryCache
} from "apollo-angular-boost";
```

Make sure to add the new modules imported to the `import` section of `@NgModule`

```javascript
imports: [
  BrowserModule,
  HttpClientModule,      // provides HttpClient for HttpLink
  IonicModule.forRoot(),
  AppRoutingModule,
  ApolloBoostModule      // module for apollo boost/client
],
```

Then you actually create the client. Add the code below to the `AppModule` class. We set up the client but we also create a cache to hold the data/state that will be utilized throughout the application.

```javascript
constructor( apolloBoost: ApolloBoost ) {

  const cache = new InMemoryCache(); // <= created cache
  
  apolloBoost.create({
    clientState: {
      cache,
      defaults: {} ,  // default settings for state
      resolvers: {}   // the resolvers for the gql queries/mutations
    }
  })
 }
```

## Setting up the first interaction with GraphQL

Create a new file called graphql-info.ts and past this code in the file. I have added comments to the code below so . hopefully it makes sense what we have done.

```javascript
import { Apollo, gql } from 'apollo-angular-boost';


export default {
  defaults: {
    users: []       // we will keep a list of users here
  },
  resolvers: {
    Query: {  },    // code for queries goes here
    Mutation: { }   // code for mutations goes here
  }
}

//
// QUERIES
//
export const ADD_USER_QUERY = gql` `;   // add a user to the local state

export const GET_USERS_QUERY = gql``;   // get a list of all users in local state
```
