import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoonaModule } from '@loona/angular';

import { HomePage } from './home.page';
import { HomeState } from './home.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoonaModule.forChild([HomeState]),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
