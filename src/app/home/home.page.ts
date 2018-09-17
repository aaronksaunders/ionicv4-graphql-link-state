import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor( private apolloClient : Apollo) {

  }

  ngOnInit() { 
   }



}



