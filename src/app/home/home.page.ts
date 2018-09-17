import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map, tap, pluck } from 'rxjs/operators';
import { GET_USERS_QUERY, GET_USER_QUERY, ADD_USER_QUERY } from '../graphql-info'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  task = { name: "" }
  allUsers$

  constructor(private apollo: Apollo) {

  }

  ngOnInit() {
    this.allUsers$ = this.getUsers()
  }

  getUserById() {

    this.apollo.watchQuery<any>({
      query: GET_USER_QUERY,
      variables: {
        id: "10",
      }
    }).valueChanges.pipe(
      map((data) => console.log(data.data))
      ).subscribe();
  }

  getUsers() {


    return this.apollo.watchQuery<any>({
      query: GET_USERS_QUERY,
    }).valueChanges.pipe(pluck("data", "users"));
  }


  addUserClicked() {
    this.addUser(new Date().getTime() + "", this.task.name)
  }


  addUser(id: string, name: string) {

    this.apollo.mutate<any, any>({
      mutation: ADD_USER_QUERY,
      variables: {
        id,
        name
      }
    }).pipe(
      tap((data) => console.log(data.data))
      ).subscribe();

  }
}



