import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { ListEmployeeComponent } from './list-employee.component';
import { CreateEmployeeComponent } from './create-employee.component';



export const appRoutes : Routes = [
   { path: 'create', component: CreateEmployeeComponent },
   { path: 'list', component: ListEmployeeComponent},
   { path: 'edit/:id', component: CreateEmployeeComponent },
   { path: '', redirectTo: '/home',pathMatch: 'full'}
 ];
 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports:[RouterModule]
})
export class EmployeeRoutingModule { }
