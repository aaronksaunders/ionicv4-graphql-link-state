import { Component, OnInit } from '@angular/core';
import { Loona } from '@loona/angular';
import { map, tap, pluck } from 'rxjs/operators';
import { GET_USERS_QUERY, GET_USER_QUERY, AddUser } from './home.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  task = { name: '' };
  allUsers$;

  constructor(private loona: Loona) {}

  ngOnInit() {
    this.allUsers$ = this.getUsers();
  }

  getUserById() {
    this.loona
      .query(GET_USER_QUERY, { id: '10' })
      .valueChanges.pipe(map(data => console.log(data.data)))
      .subscribe();
  }

  getUsers() {
    return this.loona
      .query(GET_USERS_QUERY)
      .valueChanges.pipe(pluck('data', 'users'));
  }

  addUserClicked() {
    this.addUser(new Date().getTime() + '', this.task.name);
  }

  addUser(id: string, name: string) {
    this.loona.dispatch(new AddUser({ id, name }));
  }
}
