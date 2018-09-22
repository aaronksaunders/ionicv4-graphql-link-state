import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { LoonaModule, LoonaLink, LOONA_CACHE } from '@loona/angular';

export function createApollo(link: LoonaLink, cache: InMemoryCache) {
  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [ApolloModule, LoonaModule],
  providers: [
    {
      provide: LOONA_CACHE,
      useFactory() {
        return new InMemoryCache();
      },
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [LoonaLink, LOONA_CACHE],
    },
  ],
})
export class GraphQLModule {}
