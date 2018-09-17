# ionicv4-graphql-link-state
Example showing how to manage state using graphql in local state

---

I am updating the documentation right now but you can follow along with each step by clicking on each branch

- [Step One - Getting Started](https://github.com/aaronksaunders/ionicv4-graphql-link-state/tree/step-one)
- [Step One - Lets Make Some Queries](https://github.com/aaronksaunders/ionicv4-graphql-link-state/tree/step-two)
- [Completed App](https://github.com/aaronksaunders/ionicv4-graphql-link-state)

---

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
Next lets go back to the app module and connect this new module and import the last peices to get the apollo client connected to the application.

first import the new module `graphql-info`

```javascript
import GRAPH_QL from "./graphql-info";
```

then connect the default state and the resolvers to the client by changing this
```javascript
  apolloBoost.create({
    clientState: {
      cache,
      defaults: {} ,  // default settings for state
      resolvers: {}   // the resolvers for the gql queries/mutations
    }
  })
```

to this

```javascript
  apolloBoost.create({
    clientState: {
      cache,
      defaults: GRAPH_QL.defaults ,   // default settings for state
      resolvers: GRAPH_QL.resolvers   // the resolvers for the gql queries/mutations
    }
  })

```
## Lets Make Some Queries
To get some data we need to set some data, so lets change our defaults to actually hold a user. For the user we will hve an `id`, `name` and we need to specify the type to keep graphql happy `__typename`

```javascript
  defaults: {
    users: [
      { "id": "100", "name":"Aaron", "__typename" :"User" },
      { "id": "101", "name":"Andrea", "__typename" :"User" }
    ]
  },
```

We have data now lets do the query, we are assuming a basic understanding of graphql queries here. So this is how you query all of the users; add this query to the section marked in the file `graphql-info.ts`

```javascript
export const GET_USERS_QUERY = gql`
  query getUsers {
    users  @client {
      id
      name
    }
  }
  `;
  ```
  Next we are going to use the GraphQL Tools from Apollo so please load that up in your Chrome browser or follow direction to load it based on the browser you are using. We will use these tools to execute queries for testing purposes. [Download tools by clicking this link](https://github.com/apollographql/apollo-client-devtools)

  
  when you open the tool, be sure to have the "Load From Cache" checked, we are using the cache here.

  next copy the actual query that you just pasted into the file... ONLY the query text.. Also notice the `@client` decorated added to the query, that means check the cache for the query.

  ```javascript
  query getUsers {
    users  @client {
      id
      name
    }
  }
  ```

![/readme.images/Screen Shot 2018-09-16 at 11.59.08 PM.png](https://github.com/aaronksaunders/ionicv4-graphql-link-state/blob/step-two/readme.images/tools-image-1.png)

paste the query into the devtool open in chrome.

Next we are going to run the query and get the list of users from the local state of the application, what we set in the default section when initializing the client.

![/Screen Shot 2018-09-16 at 11.59.08 PM.png](https://github.com/aaronksaunders/ionicv4-graphql-link-state/blob/step-two/readme.images/tools-image-2.png)

you can see we have the complete list of the users from the client

