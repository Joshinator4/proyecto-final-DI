import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

import { ListUserComponent } from './pages/list-user/list-user.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    EditUserComponent,
    ListUserComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class UsersModule { }
