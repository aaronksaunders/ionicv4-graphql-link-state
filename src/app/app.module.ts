import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouteReuseStrategy, Routes } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
// GRAPH QL
import { HttpClientModule } from "@angular/common/http";
import {
  ApolloBoostModule,
  ApolloBoost,
  InMemoryCache
} from "apollo-angular-boost";
import GRAPH_QL from "./graphql-info";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule, // provides HttpClient for HttpLink
    IonicModule.forRoot(),
    AppRoutingModule,
    ApolloBoostModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    apolloBoost: ApolloBoost
  ) {
    const cache = new InMemoryCache();
    apolloBoost.create({
      clientState: {
        cache,
        defaults: GRAPH_QL.defaults,
        resolvers: GRAPH_QL.resolvers
      }
    })
  }
}

